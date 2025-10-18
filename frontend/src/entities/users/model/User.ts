import type { UserRoles } from './Roles'

export interface User {
	id: number;
	login: string;
	first_name: string;
	last_name: string;
	middle_name: string;
	role: UserRoles
}