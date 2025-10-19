import { createRouter, createWebHistory } from 'vue-router'

import { ErrorsPageConfig } from '@/pages/errors'
import { LoginPageConfig } from '@/pages/login'
import { MenuPageConfig } from '@/pages/menu'
import { ProfilePageConfig } from '@/pages/profile'
import { UsersPageConfig } from '@/pages/users'

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
			redirect: MenuPageConfig.MENU_PAGE_PATH,
			meta: { middleware: [requireAuth] },
			props: { profilePath: ProfilePageConfig.PROFILE_PAGE_PATH, basePath: BASE_PAGE_PATH },
			component: AppLayout,
			children: [
				{
					path: MenuPageConfig.MENU_PAGE_PATH,
					name: MenuPageConfig.MENU_PAGE_NAME,
					component: (): ConcreteComponent => {
						return import('@/pages/menu').then(module => {
							return module.MenuPage
						})
					}
				},
				{
					path: 'tables/:tableId',
					name: 'Таблица',
					props: route =>
						({ tableId: String(route.params.tableId) }),
					meta: { middleware: [requireAuth] },
					component: (): ConcreteComponent => {
						return import('@/pages/tables').then(module => {
							return module.TablePage
						})
					}
				},
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
					path: UsersPageConfig.USERS_PAGE_PATH,
					name: UsersPageConfig.USERS_PAGE_NAME,
					component: (): ConcreteComponent => {
						return import('@/pages/users').then(module => {
							return module.UsersPage
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
				}
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
		const mergedMiddleware = [ ...meta, ...currentMiddleware ]

		return mergedMiddleware
	}, initialMiddleware)

	const middleware = combinedMiddleware

	const context = { to, from }

	return middleware[0]({
		context,
		nextMiddleware: middlewarePipeline(context, middleware, 1)
	})
})

export default router
