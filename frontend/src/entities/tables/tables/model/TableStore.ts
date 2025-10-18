import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Table } from '@/shared/api/openapi/client'

const TABLE_STORE_NAME = 'table-store'

export const useTableStore = defineStore(TABLE_STORE_NAME, () => {
    const tables = ref<Table[]>([])

    function getTableById(id: number): Table | undefined {
        return tables.value.find((table) => table.id === id)
    }

    function getTableByTitle(title: string): Table | undefined {
        return tables.value.find((table) => table.title === title)
    }

    function saveAllTables(newTables: Table[]): void {
        tables.value = newTables
    }

    function updateTable(updated: Table): void {
        tables.value = tables.value.map((table) => (table.id === updated.id ? updated : table))
    }

    const sortedTables = computed(() => {
        // return [...tables.value].sort((a, b) => a.title.localeCompare(b.title))
    })

    function clearTables(): void {
        tables.value = []
    }

    return {
        tables,
        sortedTables,
        getTableById,
        getTableByTitle,
        saveAllTables,
        updateTable,
        clearTables,
    }
})
