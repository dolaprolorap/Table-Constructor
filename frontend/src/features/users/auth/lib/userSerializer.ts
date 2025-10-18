import type { User } from '../../../../entities/users/model/User'
import type { Serializer } from '@vueuse/core'

export const userInfoSerializer: Serializer<User | null> = {
	read: (user: string): User | null => {
		return user ? JSON.parse(user) : null
	},
	write: (user: User | null): string => {
		return JSON.stringify(user)
	}
}