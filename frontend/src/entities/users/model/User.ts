import type { UserRoles } from './Roles'

export interface User {
	uid: string;
	fullName: string;
	email: string;
	role: UserRoles
}