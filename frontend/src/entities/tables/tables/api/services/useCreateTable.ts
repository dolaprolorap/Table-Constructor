import { ref, watch } from 'vue'

import {
	useCreatedId,
	useFetch,
	type ApiCreateServiceReturn,
} from '@/shared/api'
import {
	TablesService,
	type CreateTableData,
	type CreateTableResponse,
	type CreateTableError,
} from '@/shared/api/openapi/client'

import { columnsTypesToApi, type Column } from '@/entities/tables/columns'

import { useTableStore } from '../../model/TableStore'

interface UseCreateTableReturn extends ApiCreateServiceReturn<CreateTableError> {
	createTable: (params: CreateTableParams) => Promise<void>;
}

export interface CreateTableParams {
	title: string
	columns: Omit<Column, 'id'>[]
}

export function useCreateTable(): UseCreateTableReturn {

	const cachedParams = ref<CreateTableParams | null>(null)

	const {
		sendRequest,
		clearError,
		response,
		error,
		status,
		isLoading,
	} = useFetch<CreateTableResponse, CreateTableError, CreateTableData>(
		TablesService.createTable
	)

	const tableStore = useTableStore()

	const createTable = async (params: CreateTableParams): Promise<void> => {
		clearError()

		cachedParams.value = params

		await sendRequest({
			body: {
				data: {
					title: params.title,
					columns: params.columns.map(column => {
						return {
							title: column.title,
							type: columnsTypesToApi[column.type],
							enum: column.enumValues || null
						}
					})
				}
			},
		})
	}

	const { createdId } = useCreatedId({ response })

	const saveTable = (): void => {
		if (!cachedParams.value || !createdId.value) {
			return
		}

		tableStore.addTable({
			id: createdId.value,
			title: cachedParams.value.title
		})
	}

	watch(createdId, saveTable)

	return {
		createTable,
		clearError,
		createdId,
		error,
		status,
		isLoading,
	}
}
