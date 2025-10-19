<template>
  <CPaginationItem
    v-for="pagePagination in pagePaginationList"
    :key="pagePagination.paginationTitle"
    :active="pagePagination.active"
    :disabled="pagePagination.disabled"
    @click="pagePagination.goToPage"
  >
    <span
      aria-hidden="true"
    >
      {{ pagePagination.paginationTitle }}
    </span>
  </CPaginationItem>
</template>

<script setup lang="ts">
import { ref, watch, toRefs } from 'vue'

import type { PageNumberPagination } from '../model/types'

// Props and models

interface NeighbouringPagesLinksProps {
	lastPage: number;
}

const props = defineProps<NeighbouringPagesLinksProps>()

const currentPage = defineModel<number>('current-page')

const { lastPage } = toRefs(props)

// Render handlers

const pagePaginationList = ref<PageNumberPagination[]>([])

const generatePagePagination = (pageNumber: number): PageNumberPagination => {
	const goToPage = (): void => {
		currentPage.value = pageNumber
	}

	const pagePagination: PageNumberPagination = {
		paginationTitle: pageNumber.toString(),
		goToPage: goToPage
	}

	return pagePagination
}

const generatePaginationGap = (): PageNumberPagination => {
	const paginationGap: PageNumberPagination = {
		paginationTitle: '...',
		disabled: true
	}

	return paginationGap
}

const setPagePaginationList = (): void => {
	if (!currentPage.value) {
		return
	}

	pagePaginationList.value = []

	const currentPagePagination: PageNumberPagination = {
		paginationTitle: currentPage.value.toString(),
		active: true
	}

	pagePaginationList.value.push(currentPagePagination)

	if (currentPage.value !== 1) {
		const prevPageNumber = currentPage.value - 1

		const paginationPrevious = generatePagePagination(prevPageNumber)

		pagePaginationList.value.unshift(paginationPrevious)
	}

	if (currentPage.value !== lastPage.value) {
		const nextPageNumber = currentPage.value + 1

		const paginationNext = generatePagePagination(nextPageNumber)

		pagePaginationList.value.push(paginationNext)
	}

	if (currentPage.value === 1 && lastPage.value - currentPage.value > 1) {
		const nextNextPageNumber = currentPage.value + 2

		const paginationNextNext = generatePagePagination(nextNextPageNumber)

		pagePaginationList.value.push(paginationNextNext)
	}

	if (currentPage.value === lastPage.value && currentPage.value > 2) {
		const prevPrevPageNumber = currentPage.value - 2

		const paginationPrevPrev = generatePagePagination(prevPrevPageNumber)

		pagePaginationList.value.unshift(paginationPrevPrev)
	}

	// Additional checks for the case when there are only three pages
	if (!(lastPage.value === 3 && currentPage.value === 3) && currentPage.value > 2) {
		const prevGap = generatePaginationGap()

		pagePaginationList.value.unshift(prevGap)
	}

	if (!(currentPage.value === 1 && lastPage.value === 3) && currentPage.value < lastPage.value - 1) {
		const nextGap = generatePaginationGap()

		pagePaginationList.value.push(nextGap)
	}
}

watch([ currentPage, lastPage ], setPagePaginationList, { immediate: true })

</script>