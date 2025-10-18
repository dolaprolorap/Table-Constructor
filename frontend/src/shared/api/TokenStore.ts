import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

import { ACCESS_TOKEN_STORAGE_NAME } from './config/storage'
import { stringSerializer } from '../lib/storage'

const STORE_NAME = 'token'

export const useTokenStore = defineStore(STORE_NAME, () => {

	const accessToken = useStorage(ACCESS_TOKEN_STORAGE_NAME, null, localStorage, { serializer: stringSerializer })

	function setAccessToken(token: string): void {
		accessToken.value = token
	}

	function removeAccessToken(): void {
		accessToken.value = null
	}

	return {
		accessToken,
		setAccessToken,
		removeAccessToken
	}
})
