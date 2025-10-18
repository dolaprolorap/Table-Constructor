import { useEventBus } from '@vueuse/core'

import { useTokenStore } from '@/shared/api'

import { LOGOUT_REDIRECT_BUS_KEY } from '../config/eventBusKeys'
import { useAuthenticatedUserStore } from '../model/AuthenticatedUserStore'

interface UseLocalLogoutReturn {
	logoutLocally: () => void;
}

export function useLocalLogout(): UseLocalLogoutReturn {
	const userStore = useAuthenticatedUserStore()
	const tokenStore = useTokenStore()

	const logoutLoginRedirect = useEventBus(LOGOUT_REDIRECT_BUS_KEY)

	const clearUser = (): void => {
		userStore.clearAuthenticatedUser()

		tokenStore.removeAccessToken()
		tokenStore.removeRefreshToken()

		logoutLoginRedirect.emit()
	}

	return { logoutLocally: clearUser }
}