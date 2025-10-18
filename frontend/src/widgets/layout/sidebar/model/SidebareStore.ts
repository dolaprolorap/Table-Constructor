import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

import { SIDEBAR_UNFOLDABLE_STORAGE_NAME, SIDEBAR_VISIBLE_STORAGE_NAME } from '../config'

const STORE_NAME = 'sidebar'

export const useSidebarStore = defineStore(STORE_NAME, () => {

	const visible = useStorage(SIDEBAR_UNFOLDABLE_STORAGE_NAME, false, sessionStorage)
	const unfoldable = useStorage(SIDEBAR_VISIBLE_STORAGE_NAME, false, sessionStorage)

	function toggleVisible(value?: boolean): void {
		visible.value = value ? value : !visible.value
	}

	function toggleUnfoldable(): void {
		unfoldable.value = !unfoldable.value
	}

	function setUnfoldable(value: boolean): void {
		unfoldable.value = value
	}

	return { visible, unfoldable, toggleVisible, toggleUnfoldable, setUnfoldable }
})
