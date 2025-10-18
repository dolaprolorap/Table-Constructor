import type { UserApi } from '../api'
import { apiToRolesMapper } from '../model/Roles'
import type { User } from '../model/User'

export function mapApiToUser(userApi: UserApi): User {
	const user: User = {
		uid: userApi.id,
		fullName: userApi.full_name,
		email: userApi.email,
		role: apiToRolesMapper[userApi.role]
	}

	return user
}