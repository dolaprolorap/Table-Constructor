import { client } from '../openapi/client'
import { useTokenStore } from '../TokenStore'

export function useAuthMiddleware(logoutLocally: () => void): void {
	const tokenStore = useTokenStore()

	client.instance.interceptors.request.use(config => {

		config.headers.set('Authorization', `Bearer ${tokenStore.accessToken}`)

		return config
	})

	client.instance.interceptors.response.use(
		response => {
			return response
		},
		async error => {
			if (error.response.status !== 401) {
				return Promise.reject(error)
			}

			logoutLocally()
		}
	)
}
