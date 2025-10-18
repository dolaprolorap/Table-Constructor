import type { UserRoles } from '@/entities/users'

import { HeaderConfigTypes, type HeaderNavigationConfig } from '@/widgets/layout'

export type NavigationConfig = {
	[role in UserRoles]: HeaderNavigationConfig;
}

const BaseNavigation: HeaderNavigationConfig = [
	{
		type: HeaderConfigTypes.link,
		label: 'Меню',
		to: 'menu'
	},
	{
		type: HeaderConfigTypes.link,
		label: 'Таблицы',
		to: 'table'
	}
]

const CustomerNavigation: HeaderNavigationConfig = [
	...BaseNavigation
]

const BuilderNavigation: HeaderNavigationConfig = [
	...BaseNavigation
]

const InspectorNavigation: HeaderNavigationConfig = [
	...BaseNavigation
]

export const headerNavigationDefaultConfig: NavigationConfig = {
	customer: CustomerNavigation,
	builder: BuilderNavigation,
	inspector: InspectorNavigation,
}