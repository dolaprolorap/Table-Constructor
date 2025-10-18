import { computed, type Ref } from 'vue'

import { useAuthenticatedUserStore } from '@/features/users/auth'

import type { HeaderNavigationConfig } from '@/widgets/layout'

import { headerNavigationDefaultConfig } from '../config/headerNavigationConfig'

interface HeaderNavigationConfigReturn {
	headerNavigationConfig: Ref<HeaderNavigationConfig>;
}

export function useHeaderNavigationConfig(): HeaderNavigationConfigReturn {
	const userStore = useAuthenticatedUserStore()

	const updateHeaderNavigationConfig = (): HeaderNavigationConfig => {
		const user = userStore.authenticatedUser

		if (!user) {
			return []
		}

		const headerNavigationConfig: HeaderNavigationConfig = [
			...headerNavigationDefaultConfig[user.role]
		]

		return headerNavigationConfig
	}

	const headerNavigationConfig = computed<HeaderNavigationConfig>(updateHeaderNavigationConfig)

	return { headerNavigationConfig }
}
