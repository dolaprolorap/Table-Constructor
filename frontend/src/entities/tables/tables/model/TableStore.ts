import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { Table } from '@/shared/api/openapi/client'

const TABLE_STORE_NAME = 'table-store'

export const useTableStore = defineStore(TABLE_STORE_NAME, () => {
	const tables = ref<Table[]>([])

	function getTableById(id: number): Table | undefined {
		return tables.value.find(table =>
			table.id === id)
	}

	function saveAllTables(newTables: Table[]): void {
		tables.value = newTables
	}

	function addTable(newTable: Table): void {
		tables.value.unshift(newTable)
	}

	function clearTables(): void {
		tables.value = []
	}

	return {
		tables,
		getTableById,
		saveAllTables,
		clearTables,
		addTable
	}
})
