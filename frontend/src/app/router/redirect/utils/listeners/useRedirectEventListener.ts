import { useEventBus } from '@vueuse/core'
import { onUnmounted } from 'vue'

import { HOME_REDIRECT_BUS_KEY } from '@/shared/config/router'

import { LOGOUT_REDIRECT_BUS_KEY, SUCCES_LOGIN_REDIRECT_BUS_KEY } from '@/features/users/auth'

import { redirectToHomeWithReplace } from '../../redirectToHomeWithReplace'
import { redirectToLoginWithReplace } from '../../redirectToLoginWithReplace'

export function useRedirectEventListener(): void {

	const homeRedirect = useEventBus(HOME_REDIRECT_BUS_KEY)
	const unsubcribeHome = homeRedirect.on(redirectToHomeWithReplace)

	const succesLoginRedirectBus = useEventBus(SUCCES_LOGIN_REDIRECT_BUS_KEY)
	const unsubscribeSuccesLogin = succesLoginRedirectBus.on(redirectToHomeWithReplace)

	const logoutRedirectBus = useEventBus(LOGOUT_REDIRECT_BUS_KEY)
	const unsubscribeLogout = logoutRedirectBus.on(redirectToLoginWithReplace)

	onUnmounted(() => {
		unsubcribeHome()
		unsubscribeSuccesLogin()
		unsubscribeLogout()
	})
}