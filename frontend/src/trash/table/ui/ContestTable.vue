<template>
  <CCard
    id="contests-crud"
    class="p-3"
  >
    <ContestToolbar
      v-model:status="contestStatus"
      v-model:search-title="searchTitle"
    />

    <CTable
      :columns="CONTEST_TABLE_COLUMNS"
      align="middle"
      responsive
      hover
    >
      <CTableBody>
        <ContestTableContent :contests="contestStore.contests" />
      </CTableBody>
    </CTable>

    <DataLoader
      :is-loading="isLoading"
      empty-message="Конкурсов не найдено"
      :list-length="contestStore.contests.length"
    />

    <BaseTablePagination
      v-model:current-page="currentPage"
      v-model:items-per-page="itemsPerPage"
      :visible="!isLoading"
      :last-page="paginationMeta?.lastPage || BaseTablePaginationConfig.DEFAULT_START_PAGE"
    />
  </CCard>

  <ErrorMessageModal
    :error="error"
    :error-message="error?.errorMessage && error?.errorMessage"
  />
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { useDataRefreshedListener } from '@/shared/api'
import { DataLoader, BaseTablePagination, BaseTablePaginationConfig, ErrorMessageModal } from '@/shared/ui/components'

import { useContestStore, ContestStatuses, useGetAllContests } from '@/entities/contests'

import ContestTableContent from './ContestTableContent.vue'
import { CONTEST_TABLE_COLUMNS } from '../config'
import ContestToolbar from './ContestToolbar.vue'

const currentPage = ref<number>(BaseTablePaginationConfig.DEFAULT_START_PAGE)
const itemsPerPage = ref<number>(Number(BaseTablePaginationConfig.DEFAULT_ITEMS_PER_PAGE))
const contestStatus = ref<ContestStatuses | null>(null)
const searchTitle = ref<string>('')

const contestStore = useContestStore()

const { getAllContests, isLoading, error, paginationMeta } = useGetAllContests()

const sendRequest = (): void => {
  getAllContests({
  // eslint-disable-next-line no-undefined
    status: contestStatus.value ? contestStatus.value : undefined,
    page: currentPage.value,
    pageSize: itemsPerPage.value,
    // eslint-disable-next-line no-undefined
    title: searchTitle.value || undefined
  })
}

watch([currentPage, itemsPerPage, contestStatus, searchTitle], sendRequest, { immediate: true })

const goToFirstPage = (): void => {
  currentPage.value = BaseTablePaginationConfig.DEFAULT_START_PAGE
}

watch([contestStatus, searchTitle], goToFirstPage, { immediate: true })

const itemsOnCurrentPage = computed(()=>{
  return contestStore.contests.length
})

useDataRefreshedListener({ currentPage, itemsOnCurrentPage, sendRequest })

</script>

<style lang="scss" scoped>
    #contests-crud{
      display: flex;
      flex-direction: column;
      gap: 1rem
    }
  </style>
