import { createRouter, createWebHistory } from 'vue-router'

import { ErrorsPageConfig } from '@/pages/errors'
import { LoginPageConfig } from '@/pages/login'
import { ProfilePageConfig } from '@/pages/profile'

import { BASE_PAGE_NAME, BASE_PAGE_PATH } from './config'
import { middlewarePipeline } from './middleware'
import { requireAuth } from './middleware/requireAuth'
import { requireGuest } from './middleware/requireGuest'
import type { MiddlewareHandler } from './types'
import AppLayout from '../layout/AppLayout.vue'
import type { ConcreteComponent } from 'vue'

declare module 'vue-router' {
	export interface RouteMeta {
		middleware?: MiddlewareHandler[];
	}
}

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: LoginPageConfig.LOGIN_PAGE_PATH,
			name: LoginPageConfig.LOGIN_PAGE_NAME,
			meta: { middleware: [requireGuest] },
			component: (): ConcreteComponent => {
				return import('@/pages/login').then(module => {
					return module.LoginPage
				})
			}
		},
		{
			path: BASE_PAGE_PATH,
			name: BASE_PAGE_NAME,
			meta: { middleware: [requireAuth] },
			props: { profilePath: ProfilePageConfig.PROFILE_PAGE_PATH, basePath: BASE_PAGE_PATH },
			component: AppLayout,
			children: [
				{
					path: ProfilePageConfig.PROFILE_PAGE_PATH,
					name: ProfilePageConfig.PROFILE_PAGE_NAME,
					component: (): ConcreteComponent => {
						return import('@/pages/profile').then(module => {
							return module.ProfileView
						})
					}
				},
				{
					path: '/:pathMatch(.*)*',
					name: ErrorsPageConfig.NOT_FOUND_PAGE_NAME,
					component: (): ConcreteComponent => {
						return import('@/pages/errors').then(module => {
							return module.NotFound
						})
					}
				},
				{
					path: '',
					name: 'HomeIndex',
					component: () => import('@/pages/menu').then(m => m.MenuPage),
				},
			]
		}
	]
})

router.beforeEach((to, from) => {
	if (!to.meta.middleware) {
		return
	}

	const initialMiddleware: MiddlewareHandler[] = []
	const combinedMiddleware = to.matched.reduce((meta, route) => {
		const currentMiddleware = route.meta.middleware || []
		const mergedMiddleware = [...meta, ...currentMiddleware]

		return mergedMiddleware
	}, initialMiddleware)

	const middleware = combinedMiddleware

	const context = {
		to,
		from
	}

	return middleware[0]({
		context,
		nextMiddleware: middlewarePipeline(context, middleware, 1)
	})
})

export default router
