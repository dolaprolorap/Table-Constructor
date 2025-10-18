import { BASE_PAGE_PATH, REDIRECT_FROM_STORAGE_NAME } from '@/app/router/config'

import router from '..'

export function redirectToHomeWithReplace(): void {
	const redirectedFrom = sessionStorage.getItem(REDIRECT_FROM_STORAGE_NAME)

	if (redirectedFrom) {
		router.replace(redirectedFrom)

		return
	}

	router.replace(BASE_PAGE_PATH)
}
