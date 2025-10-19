<template>
  <MenuToolbar v-model:search-title="searchTitle" />
  <div
    id="tables-cards"
    class="mt-4"
  >
    <div
      v-if="isLoading"
      class="loading-state"
    >
      <CSpinner
        color="primary"
        size="lg"
      />
      <p class="loading-text">
        Загрузка таблиц...
      </p>
    </div>

    <div
      v-else
      class="cards-grid"
    >
      <div
        v-for="table in tableStore.tables"
        :key="table.id"
      >
        <SmallCard
          :id="table.id"
          :title="table.title"
          @select="onSelect"
        />
      </div>
    </div>

    <BaseTablePagination
      v-model:current-page="currentPage"
      v-model:items-per-page="itemsPerPage"
      :visible="!isLoading"
      :last-page="paginationMeta?.lastPage || BaseTablePaginationConfig.DEFAULT_START_PAGE"
      class="mt-3"
    />
  </div>
</template>
<script setup lang="ts">
import { CSpinner } from '@coreui/vue'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { SmallCard, BaseTablePagination, BaseTablePaginationConfig } from '@/shared/ui/components'

import { useTableStore, useGetAllTables } from '@/entities/tables/tables'

import { MenuToolbar } from '..'

const router = useRouter()

const tableStore = useTableStore()
const { getAllTables, isLoading, error, paginationMeta } = useGetAllTables()

const currentPage = ref<number>(BaseTablePaginationConfig.DEFAULT_START_PAGE)
const itemsPerPage = ref<number>(Number(BaseTablePaginationConfig.DEFAULT_ITEMS_PER_PAGE))
const searchTitle = ref<string>('')

const sendRequest = (): void => {
	getAllTables({
		page: currentPage.value,
		pageSize: itemsPerPage.value,
		title: searchTitle.value
	})
}
watch([ currentPage, itemsPerPage, searchTitle ], sendRequest, { immediate: true })

const onSelect = (id: number): void => {
	router.push({ name: 'Таблица', params: { tableId: String(id) } })
}
</script>
<style scoped>
#tables-cards {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 12px;
    justify-items: center;
}

.loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 0;
    color: var(--cui-text-muted, #6c757d);
}

.loading-text {
    margin-top: 0.75rem;
    font-size: 0.95rem;
}
</style>
