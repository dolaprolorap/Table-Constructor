import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed } from 'vue'

import type { User } from '@/entities/users'

import { USER_STORAGE_NAME } from '../config/storage'
import { userInfoSerializer } from '../lib/userSerializer'

const STORE_NAME = 'authenticated-user'

export const useAuthenticatedUserStore = defineStore(STORE_NAME, () => {

	const authenticatedUser = useStorage(USER_STORAGE_NAME, null, localStorage, { serializer: userInfoSerializer })

	const isAuthenticated = computed<boolean>(() => {
		if (!authenticatedUser.value) {
			return false
		}

		return true
	})

	function setAuthenticatedUser(user: User): void {
		authenticatedUser.value = user
	}

	function clearAuthenticatedUser(): void {
		authenticatedUser.value = null
	}

	return {
		authenticatedUser,
		isAuthenticated,
		setAuthenticatedUser,
		clearAuthenticatedUser
	}
})
