import { ID_PARAM_NAME } from '@/shared/config/router'

import type { MiddlewareHandlerParams, MiddlewareHandlerReturn } from '../../types'

export function checkIdParamOptional({
	context,
	nextMiddleware
}: MiddlewareHandlerParams): MiddlewareHandlerReturn {

	const id = context.to.params[ID_PARAM_NAME]

	if (!id) {
		return nextMiddleware()
	}

	const idIsCorrect = typeof id === 'string' && Number(id) && Number(id) >= 0

	if (!idIsCorrect) {
		return context.from
	}

	return nextMiddleware()
}