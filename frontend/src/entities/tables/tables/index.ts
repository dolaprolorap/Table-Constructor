import type { Table } from '@/shared/api/openapi/client'

import { useGetAllTables, useCreateTable, useGetTableById } from './api'
import { useTableStore } from './model/TableStore'

export type {
	Table
}

export {
	useTableStore,
	useGetAllTables,
	useCreateTable,
	useGetTableById
}