import { watch } from 'vue'

import { useFetch, type ApiServiceReturn } from '@/shared/api'
import { AuthService, type UserLogoutError, type UserLogoutResponse } from '@/shared/api/openapi/client'

import { useLocalLogout } from '../lib/useLocalLogout'

interface UseUserLogoutReturn extends ApiServiceReturn<UserLogoutError> {
	toLogout: () => Promise<void>;
}

export function useUserLogout(): UseUserLogoutReturn {
	const { logoutLocally } = useLocalLogout()

	const { sendRequest, clearError, response, error, status, isLoading }
		= useFetch<
			UserLogoutResponse,
			UserLogoutError,
			object
		>(AuthService.userLogout)

	const toLogout = async (): Promise<void> => {
		await sendRequest({})
	}

	watch(response, logoutLocally)

	return { toLogout, clearError, error, status, isLoading }
}