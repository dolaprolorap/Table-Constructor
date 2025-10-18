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

const AdminNavigation: HeaderNavigationConfig = [
	...BaseNavigation
]

const EditorNavigation: HeaderNavigationConfig = [
	...BaseNavigation
]

const ViewerNavigation: HeaderNavigationConfig = [
	...BaseNavigation
]

export const headerNavigationDefaultConfig: NavigationConfig = {
	admin: AdminNavigation,
	editor: EditorNavigation,
	viewer: ViewerNavigation,
}