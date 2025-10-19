<template>
  <div
    v-if="visible"
    class="d-flex justify-content-between align-items-center"
  >
    <CPagination

      class="base-table-pagination"
    >
      <CPaginationItem
        :disabled="currentPage === 1"
        @click="goToFirstPage"
      >
        <span aria-hidden="true">&laquo;</span>
      </CPaginationItem>

      <CPaginationItem
        :disabled="currentPage === 1"
        @click="goToPreviousPage"
      >
        <span aria-hidden="true">&lsaquo;</span>
      </CPaginationItem>

      <NeighbouringPagesLinks
        v-model:current-page="currentPage"
        :last-page="lastPage"
      />

      <CPaginationItem
        :disabled="currentPage === lastPage"
        @click="goToNextPage"
      >
        <span aria-hidden="true">&rsaquo;</span>
      </CPaginationItem>

      <CPaginationItem
        :disabled="currentPage === lastPage"
        @click="goToLastPage"
      >
        <span aria-hidden="true">&raquo;</span>
      </CPaginationItem>
    </CPagination>
    <div class="d-flex">
      <CFormSelect
        v-model="itemsPerPage"
        :options="[
          { label: '5', value: '5' },
          { label: '10', value: '10' },
          { label: '15', value: '15'} ,
          { label: '20', value: '20' }
        ]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'

import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_START_PAGE } from '../config'
import NeighbouringPagesLinks from './NeighbouringPagesLinks.vue'
import { useTablePaginationModel } from '../model/useTablePaginationModel'

interface BaseTablePaginationProps {
	lastPage: number;
	visible: boolean;
}

const props = defineProps<BaseTablePaginationProps>()

// Model
const currentPageModel = defineModel<number>('currentPage')

const itemsPerPageModel = defineModel<number>('itemsPerPage')

const { lastPage } = toRefs(props)

const currentPage = ref<number>(DEFAULT_START_PAGE)
const itemsPerPage = ref<string>(DEFAULT_ITEMS_PER_PAGE.toString())

const goToFirstPage = (): void => {
	currentPage.value = 1
}

const goToPreviousPage = (): void => {
	if (currentPage.value <= 1) {
		return
	}

	currentPage.value -= 1
}

const goToNextPage = (): void => {
	if (currentPage.value >= lastPage.value) {
		return
	}

	currentPage.value += 1
}

const goToLastPage = (): void => {
	currentPage.value = lastPage.value
}

watch(itemsPerPage, goToFirstPage)

useTablePaginationModel({ currentPage, itemsPerPage, currentPageModel, itemsPerPageModel })

</script>

<style>
.base-table-pagination .pagination li {
  cursor: pointer;
}

.base-table-pagination .pagination li.disabled {
  cursor: auto;
  background: none !important;
}

.base-table-pagination .pagination {
  margin-bottom: 0;
}
</style>