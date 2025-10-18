import { UserRoles } from '../model/Roles'

export const UserRolesRu = {
	[UserRoles.admin]: 'администратор',
	[UserRoles.editor]: 'редактор',
	[UserRoles.viewer]: 'наблюдатель',
} as const