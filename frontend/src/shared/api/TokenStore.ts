import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

import { ACCESS_TOKEN_STORAGE_NAME, REFRESH_TOKEN_STORAGE_NAME } from './config/storage'
import { stringSerializer } from '../lib/storage'

const STORE_NAME = 'token'

export const useTokenStore = defineStore(STORE_NAME, () => {

	const accessToken = useStorage(ACCESS_TOKEN_STORAGE_NAME, null, localStorage, { serializer: stringSerializer })
	const refreshToken = useStorage(REFRESH_TOKEN_STORAGE_NAME, null, localStorage, { serializer: stringSerializer })

	function setAccessToken(token: string): void {
		accessToken.value = token
	}

	function removeAccessToken(): void {
		accessToken.value = null
	}

	function setRefreshToken(token: string): void {
		refreshToken.value = token
	}

	function removeRefreshToken(): void {
		refreshToken.value = null
	}

	return {
		accessToken,
		refreshToken,
		setAccessToken,
		removeAccessToken,
		setRefreshToken,
		removeRefreshToken
	}
})
