import { computed, ref, watch } from 'vue'

import {
	useCreatedId,
	useFetch,
	type ApiCreateServiceReturn,
} from '@/shared/api'
import {
	RowsService,
	type CreateRowData,
	type CreateRowError,
	type CreateRowResponse,
} from '@/shared/api/openapi/client'

import { useAuthenticatedUserStore } from '@/features/users/auth'

import type { TableCell } from '../../cells'
import { useTableRowsStore } from '../model/RowStore'

interface UseCreateTableReturn extends ApiCreateServiceReturn<CreateRowError> {
	addRow: (params: CreateTableParams) => Promise<void>;
}

export interface CreateTableParams {
	tableId: number;
	data: TableCell[]
}

export function useAddTableRow(): UseCreateTableReturn {

	const cachedParams = ref<CreateTableParams | null>(null)

	const {
		sendRequest,
		clearError,
		response,
		error,
		status,
		isLoading,
	} = useFetch<CreateRowResponse, CreateRowError, CreateRowData>(
		RowsService.createRow
	)

	const rowStore = useTableRowsStore()

	const addRow = async (params: CreateTableParams): Promise<void> => {
		clearError()

		cachedParams.value = params

		const mappedData = params.data.map(dataValue => {
			if (dataValue.data instanceof Date) {
				return {
					column_id: dataValue.columnId,
					data: dataValue.data.toISOString()
				}
			}

			return {
				column_id: dataValue.columnId,
				data: dataValue.data
			}
		})

		await sendRequest({
			body: {
				data: {
					table_id: params.tableId,
					data: JSON.stringify(mappedData)
				}
			},
		})
	}

	const createdId = computed<number | null>(() => {
		return response.value?.data[0] || null
	})

	const { authenticatedUser } = useAuthenticatedUserStore()

	const saveRow = (): void => {
		if (!cachedParams.value || !createdId.value) {
			return
		}

		rowStore.addRow({
			id: createdId.value,
			data: cachedParams.value.data,
			createdAt: new Date(),
			createdBy: authenticatedUser?.login || '',
			deletedAt: null,
			deletedBy: null
		})
	}

	watch(createdId, saveRow)

	return {
		addRow,
		clearError,
		createdId,
		error,
		status,
		isLoading,
	}
}
