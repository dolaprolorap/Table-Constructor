import { useEventBus } from '@vueuse/core'
import { computed, ref, watch } from 'vue'

import { ApiStatuses, useFetch, useTokenStore, type ApiServiceReturn } from '@/shared/api'
import { AuthService, type UserLoginData, type UserLoginError, type UserLoginResponse } from '@/shared/api/openapi/client'

import { useGetAuthenticatedUser } from './useAuthenticatedGetUser'
import { SUCCES_LOGIN_REDIRECT_BUS_KEY } from '../config/eventBusKeys'
import { useAuthenticatedUserStore } from '../model/AuthenticatedUserStore'

interface UseUserLoginReturn extends ApiServiceReturn<UserLoginError> {
	toLogin: (params: LoginParams) => Promise<void>;
}

interface LoginParams {
	email: string;
	password: string;
}

export function useUserLogin(): UseUserLoginReturn {
	const status = ref<ApiStatuses>(ApiStatuses.none)

	const isLoading = computed(() => {
		return status.value === ApiStatuses.pending
	})

	const { sendRequest, response, error: loginError, clearError: clearLoginError }
		= useFetch<
			UserLoginResponse,
			UserLoginError,
			UserLoginData
		>(AuthService.userLogin)

	const toLogin = async({ email, password }: LoginParams): Promise<void> => {
		status.value = ApiStatuses.pending

		await sendRequest({
			body: {
				email,
				password
			}
		})
	}

	const tokenStore = useTokenStore()

	const { getAuthenticatedUser, user, error: userError, clearError: clearUserError } = useGetAuthenticatedUser()

	const getUser = (): void => {
		if (!response.value) {
			status.value = ApiStatuses.error

			return
		}

		tokenStore.setAccessToken(response.value.access_token)
		tokenStore.setAccessToken(response.value.refresh_token)

		getAuthenticatedUser()
	}

	watch(response, getUser)

	const succesLoginRedirect = useEventBus(SUCCES_LOGIN_REDIRECT_BUS_KEY)

	const userStore = useAuthenticatedUserStore()

	const saveUser = (): void => {
		if (!user.value) {
			status.value = ApiStatuses.error

			return
		}

		userStore.setAuthenticatedUser(user.value)

		status.value = ApiStatuses.success
		succesLoginRedirect.emit()
	}

	watch(user, saveUser)

	const error = computed(() => {
		if (loginError.value) {
			return loginError.value
		}

		if (userError.value) {
			return loginError.value
		}

		return null
	})

	const clearError = (): void => {
		clearLoginError()
		clearUserError()
	}

	return {
		toLogin,
		error,
		status,
		isLoading,
		clearError
	}
}
