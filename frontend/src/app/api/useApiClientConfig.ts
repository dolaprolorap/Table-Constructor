import { useAuthMiddleware } from '@/shared/api'
import { client } from '@/shared/api/openapi/client'

import { useLocalLogout } from '@/features/users/auth'

export function useApiClientConfig(): void {
	client.setConfig({
		baseURL: import.meta.env.VITE_API_BASE_URL
	})

	const { logoutLocally } = useLocalLogout()

	useAuthMiddleware(logoutLocally)
}
