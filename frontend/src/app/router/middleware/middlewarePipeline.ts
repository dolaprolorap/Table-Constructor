import type {
	MiddlewareContext,
	MiddlewareHandler,
	MiddlewareHandlerReturn,
	MiddlewarePipelineReturn
} from '../types'

export function middlewarePipeline(
	context: MiddlewareContext,
	middleware: MiddlewareHandler[],
	index: number
): MiddlewarePipelineReturn {

	const nextMiddleware = middleware[index]

	if (!nextMiddleware) {
		return (): MiddlewareHandlerReturn => {
			return true
		}
	}

	return (): MiddlewareHandlerReturn => {
		const nextPipeline = middlewarePipeline(context, middleware, index + 1)

		return nextMiddleware({ context, nextMiddleware: nextPipeline })
	}
}
