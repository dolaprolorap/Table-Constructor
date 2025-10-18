import { useAuthenticatedUserStore } from '@/features/users/auth'

import type { MiddlewareHandlerParams, MiddlewareHandlerReturn } from '../types'

export function requireGuest({
	context,
	nextMiddleware
}: MiddlewareHandlerParams): MiddlewareHandlerReturn {

	const userStore = useAuthenticatedUserStore()

	if (!userStore.isAuthenticated) {
		return nextMiddleware()
	}

	return context.from
}
