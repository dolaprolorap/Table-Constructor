import { useAuthenticatedUserStore } from '@/features/users/auth'

import { LoginPageConfig } from '@/pages/login'

import { REDIRECT_FROM_STORAGE_NAME } from '@/app/router/config'

import type { MiddlewareHandlerParams, MiddlewareHandlerReturn } from '../types'

export function requireAuth({
	context,
	nextMiddleware
}: MiddlewareHandlerParams): MiddlewareHandlerReturn {

	const userStore = useAuthenticatedUserStore()

	if (userStore.isAuthenticated) {
		return nextMiddleware()
	}

	sessionStorage.setItem(REDIRECT_FROM_STORAGE_NAME, context.from.path)

	return { name: LoginPageConfig.LOGIN_PAGE_NAME, replace: true }
}
