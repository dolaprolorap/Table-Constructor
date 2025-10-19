import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { TableRow } from './Row'

const STORE_NAME = 'table-rows'

export const useTableRowsStore = defineStore(STORE_NAME, () => {

	const tableRows = ref<TableRow[]>([])

	function setRows(newRows: TableRow[]): void {
		tableRows.value = newRows
	}

	function addRow(newRow: TableRow): void {
		tableRows.value.unshift(newRow)
	}

	function removeRow(rowID: number): void {
		tableRows.value = tableRows.value.filter(row => {
			return row.id !== rowID
		})
	}

	function updateRow(updatedRow: TableRow): void {
		tableRows.value = tableRows.value.map(row => {
			if (row.id !== updatedRow.id) {
				return row
			}

			return updatedRow
		})
	}

	function clearRows(): void {
		tableRows.value = []
	}

	return {
		tableRows,
		setRows,
		addRow,
		removeRow,
		updateRow,
		clearRows
	}
})
