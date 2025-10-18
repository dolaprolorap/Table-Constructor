import { LoginPageConfig } from '@/pages/login'

import { REDIRECT_FROM_STORAGE_NAME } from '@/app/router/config'

import router from '..'

export function redirectToLoginWithReplace(): void {
	sessionStorage.setItem(REDIRECT_FROM_STORAGE_NAME, router.currentRoute.value.path)

	router.replace({
		name: LoginPageConfig.LOGIN_PAGE_NAME
	})
}
