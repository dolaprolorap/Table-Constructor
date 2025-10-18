import { AuthService, client } from '../openapi/client'
import { useTokenStore } from '../TokenStore'

const REFRESH_URL = 'refresh'

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

			if (error.config.url.includes(REFRESH_URL) || !tokenStore.refreshToken) {
				logoutLocally()

				return Promise.reject(error)
			}

			const response = await AuthService.refreshToken({
				body: {
					refresh_token: tokenStore.refreshToken
				}
			})

			if (response.data) {
				tokenStore.setAccessToken(response.data.access_token)

				error.config.headers.set('Authorization', `Bearer ${response.data.access_token}`)

				return client.request(error.config)
			}

			logoutLocally()
		}
	)
}
