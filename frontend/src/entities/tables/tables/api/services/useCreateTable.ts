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

interface UseCreateTableReturn extends ApiCreateServiceReturn<CreateTableError> {
	createTable: (params: CreateTableParams) => Promise<void>;
}

export interface CreateTableParams {
	title: string
	columns: Omit<Column, 'id'>[]
}

export function useCreateTable(): UseCreateTableReturn {
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

	const createTable = async (params: CreateTableParams): Promise<void> => {
		clearError()

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

	return {
		createTable,
		clearError,
		createdId,
		error,
		status,
		isLoading,
	}
}
