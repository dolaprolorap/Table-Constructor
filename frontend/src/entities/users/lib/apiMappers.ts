import type { UserApi } from '../api'
import { apiToRolesMapper } from './rolesApiMappers'
import type { User } from '../model/User'

export function mapApiToUser(userApi: UserApi): User {
	const user: User = {
		id: userApi.id,
		first_name: userApi.first_name,
		last_name: userApi.last_name,
		middle_name: userApi.middle_name,
		login: userApi.login,
		role: apiToRolesMapper[userApi.role]
	}

	return user
}