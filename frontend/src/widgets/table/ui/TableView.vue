<template>
  <CCard
    id="contests-crud"
    class="p-3"
  >
    <TableToolbar :table="table" />

    <CTable
      :columns="table.columns.map((col)=>{
        return {
          key: col.id,
          label: col.title
        }
      })"
      align="middle"
      responsive
      hover
    >
      <CTableBody>
        <TableItem
          v-for="(row, idx) of tableRowStore.tableRows"
          :key="idx"
          :row="row"
        />
      </CTableBody>
    </CTable>

    <DataLoader
      :is-loading="isLoading"
      empty-message="Данных не найдено"
      :list-length="tableRowStore.tableRows.length"
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
import { ref, toRefs, watch } from 'vue'

import { BaseTablePagination, BaseTablePaginationConfig, DataLoader } from '@/shared/ui/components'

import { useGetAllTablesRows, useTableRowsStore } from '@/entities/tables/rows'
import type { TableWithColumns } from '@/entities/tables/tables/model/types/tablesType'

import TableItem from './TableItem.vue'
import TableToolbar from './TableToolbar.vue'

interface TableProps {
	table: TableWithColumns
}

const props = defineProps<TableProps>()

const { table } = toRefs(props)

const tableRowStore = useTableRowsStore()

const { getAllTablesRows, isLoading, error, paginationMeta } = useGetAllTablesRows()

const currentPage = ref<number>(BaseTablePaginationConfig.DEFAULT_START_PAGE)
const itemsPerPage = ref<number>(Number(BaseTablePaginationConfig.DEFAULT_ITEMS_PER_PAGE))

const sendRequest = (): void => {
	getAllTablesRows({
		page: currentPage.value,
		pageSize: itemsPerPage.value,
		deleted: false,
		tableId: table.value.id
	})
}

watch([ currentPage, itemsPerPage, table ], sendRequest, { immediate: true })

const goToFirstPage = (): void => {
	currentPage.value = BaseTablePaginationConfig.DEFAULT_START_PAGE
}

watch([table], goToFirstPage, { immediate: true })
</script>