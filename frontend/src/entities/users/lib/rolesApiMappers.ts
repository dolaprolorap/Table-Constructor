import { UserRoles } from '../model/Roles'

export const apiToRolesMapper = {
	ADMIN: UserRoles.admin,
	EDITOR: UserRoles.editor,
	VIEWER: UserRoles.viewer,
} as const

export const rolesToApiMapper = {
	[UserRoles.admin]: 'ADMIN',
	[UserRoles.editor]: 'EDITOR',
	[UserRoles.viewer]: 'VIEWER',
} as const