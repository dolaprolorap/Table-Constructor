import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { User } from '@/entities/users'

const STORE_NAME = 'users'

export const useUsersStore = defineStore(STORE_NAME, () => {

	const users = ref<User[]>([])

	function setUsers(newUsers: User[]): void {
		users.value = newUsers
	}

	function addUser(newUser: User): void {
		users.value.unshift(newUser)
	}

	function removeUser(userId: number): void {
		users.value = users.value.filter(user => {
			return user.id !== userId
		})
	}

	function clearUsers(): void {
		users.value = []
	}

	return {
		users,
		setUsers,
		addUser,
		removeUser,
		clearUsers
	}
})
