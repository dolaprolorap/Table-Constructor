import {  watch } from 'vue'

import {
	useFetch,
	usePaginationMeta,
	type ApiServiceReturnWithPaginationMeta
} from '@/shared/api'
import {
	RowsService,
	type GetAllRowsData,
	type GetAllRowsError,
	type GetAllRowsResponse
} from '@/shared/api/openapi/client'

import type { TableRow } from '../model/Row'
import { useTableRowsStore } from '../model/RowStore'

interface UseGetAllTablesRowsReturn extends ApiServiceReturnWithPaginationMeta<GetAllRowsError> {
	getAllTablesRows: (params: GetAllTablesRowsParams) => Promise<void>;
}

export interface GetAllTablesRowsParams {
	page?: number;
	pageSize?: number;
	tableId: number;
	deleted?: boolean;
}

export function useGetAllTablesRows(): UseGetAllTablesRowsReturn {
	const { sendRequest, clearError, response, error, status, isLoading }
		= useFetch<GetAllRowsResponse, GetAllRowsError, GetAllRowsData>(
			RowsService.getAllRows
		)

	const rowStore = useTableRowsStore()

	const getAllTablesRows = async (params: GetAllTablesRowsParams): Promise<void> => {
		rowStore.clearRows()

		await sendRequest({
			query: {
				table_id: params.tableId,
				deleted: params.deleted ? 1 : 0,
				page: params.page,
				page_size: params.pageSize,
			}
		})
	}

	const saveRows = (): void => {
		const res = response.value

		if (!res || !res.data) return

		const rows: TableRow[] = res.data.map(apiRow => {
			return {
				id: apiRow.id,
				data: apiRow.data.map(apiCell => {

					const dateData = new Date(apiCell.data)

					const numberData = Number(apiCell.data)

					const cellData = dateData ? dateData : numberData ? numberData : apiCell.data

					return {
						data: cellData,
						columnId: apiCell.column_id
					}
				}),
				createdAt: new Date(apiRow.created_at),
				createdBy: apiRow.created_by,
				deletedAt: apiRow.deleted_at ? new Date(apiRow.deleted_at) : null,
				deletedBy: apiRow.deleted_by || null
			}
		})

		rowStore.setRows(rows)
	}

	watch(response, saveRows)

	const { paginationMeta } = usePaginationMeta({ response })

	return {
		getAllTablesRows,
		clearError,
		paginationMeta,
		error,
		status,
		isLoading
	}
}
