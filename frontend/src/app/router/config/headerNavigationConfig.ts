import type { UserRoles } from '@/entities/users'

import { HeaderConfigTypes, type HeaderNavigationConfig } from '@/widgets/layout'

import { MenuPageConfig } from '@/pages/menu'
import { UsersPageConfig } from '@/pages/users'

export type NavigationConfig = {
	[role in UserRoles]: HeaderNavigationConfig;
}

const BaseNavigation: HeaderNavigationConfig = [
	{
		type: HeaderConfigTypes.link,
		label: MenuPageConfig.MENU_PAGE_NAME,
		to: MenuPageConfig.MENU_PAGE_PATH
	}
]

const AdminNavigation: HeaderNavigationConfig = [
	...BaseNavigation,
	{
		type: HeaderConfigTypes.link,
		label: UsersPageConfig.USERS_PAGE_NAME,
		to: UsersPageConfig.USERS_PAGE_PATH
	}
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