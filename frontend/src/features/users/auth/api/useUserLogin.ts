import { useEventBus } from '@vueuse/core'
import { watch } from 'vue'

import { useFetch, useTokenStore, type ApiServiceReturn } from '@/shared/api'
import { AuthService, type UserLoginData, type UserLoginError, type UserLoginResponse } from '@/shared/api/openapi/client'

import { mapApiToUser } from '@/entities/users'

import { SUCCES_LOGIN_REDIRECT_BUS_KEY } from '../config/eventBusKeys'
import { useAuthenticatedUserStore } from '../model/AuthenticatedUserStore'

interface UseUserLoginReturn extends ApiServiceReturn<UserLoginError> {
	toLogin: (params: LoginParams) => Promise<void>;
}

interface LoginParams {
	login: string;
	password: string;
}

export function useUserLogin(): UseUserLoginReturn {
	const { sendRequest, response, error, status, isLoading, clearError }
		= useFetch<
			UserLoginResponse,
			UserLoginError,
			UserLoginData
		>(AuthService.userLogin)

	const toLogin = async({ login, password }: LoginParams): Promise<void> => {
		await sendRequest({
			body: {
				data: {
					login,
					password
				}
			}
		})
	}

	const succesLoginRedirect = useEventBus(SUCCES_LOGIN_REDIRECT_BUS_KEY)

	const tokenStore = useTokenStore()

	const userStore = useAuthenticatedUserStore()

	const saveUser = (): void => {
		if (!response.value) {
			return
		}

		const user = mapApiToUser(response.value.data.user)

		userStore.setAuthenticatedUser(user)
		tokenStore.setAccessToken(response.value.data.token)

		succesLoginRedirect.emit()
	}

	watch(response, saveUser)

	return {
		toLogin,
		error,
		status,
		isLoading,
		clearError
	}
}
