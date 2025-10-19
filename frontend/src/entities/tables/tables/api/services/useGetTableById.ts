import { useMemoize } from '@vueuse/core'
import { ref, watch, type Ref } from 'vue'

import { type ApiServiceReturn, useFetch } from '@/shared/api'
import {
	type GetTableByIdData,
	type GetTableByIdResponse,
	type GetTableByIdError,
	TablesService
} from '@/shared/api/openapi/client'

import { mapApiToTableWithColumns } from '../../lib/mappers/apiMappers'
import type { TableWithColumns } from '../../model/types/tablesType'

interface UseGetTableByIdReturn extends ApiServiceReturn<GetTableByIdError> {
	getTableById: (params: GetTableByIdParams) => Promise<void>;
	table: Ref<TableWithColumns | null>
}

interface GetTableByIdParams {
	id: number;
}

export function useGetTableById(): UseGetTableByIdReturn {

	const table = ref<TableWithColumns | null>(null)

	const {
		sendRequest,
		clearError,
		response,
		error,
		status,
		isLoading
	} = useFetch<
		GetTableByIdResponse,
		GetTableByIdError,
		GetTableByIdData
	>(TablesService.getTableById)

	let id: number | null = null

	const getTableById = useMemoize(async (params: GetTableByIdParams): Promise<void> => {
		clearError()
		table.value = null
		id = params.id

		await sendRequest({
			path: {
				id: params.id
			}
		})
	})

	const saveTable = (): void => {
		if (!response.value || !id) {
			return
		}

		table.value = {
			...mapApiToTableWithColumns(response.value),
			['id']: id
		}
	}

	watch(response, saveTable)

	return {
		getTableById,
		clearError,
		error,
		status,
		isLoading,
		table
	}
}