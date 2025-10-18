import type { RouteLocationNormalizedGeneric, RouteLocationRaw } from 'vue-router'

export interface MiddlewareContext {
	to: RouteLocationNormalizedGeneric;
	from: RouteLocationNormalizedGeneric;
}

export interface MiddlewareHandlerParams {
	context: MiddlewareContext;
	nextMiddleware: MiddlewarePipelineReturn;
}

export type MiddlewareHandlerReturn = RouteLocationRaw | true
export type MiddlewarePipelineReturn = () => MiddlewareHandlerReturn
export type MiddlewareHandler = (params: MiddlewareHandlerParams) => MiddlewareHandlerReturn
