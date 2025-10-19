import { useCreateTable } from './services/useCreateTable'
import { useGetAllTables } from './services/useGetAllTables'
import { useGetTableById } from './services/useGetTableById'

export { useGetAllTables, useCreateTable, useGetTableById }

export type {
	Table as TableApi
} from '@/shared/api/openapi/client'