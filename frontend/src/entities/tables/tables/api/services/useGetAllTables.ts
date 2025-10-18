import { ref, watch, type Ref } from 'vue'

import {
  useFetch,
  usePaginationMeta,
  type ApiServiceReturnWithPaginationMeta
} from '@/shared/api'

import {
  TablesService,
  type GetAllTablesData,
  type GetAllTablesResponse,
  type GetAllTablesError
} from '@/shared/api/openapi/client'

import { useTableStore, type Table } from '@/entities/tables/tables'

interface UseGetAllTablesReturn extends ApiServiceReturnWithPaginationMeta<GetAllTablesError> {
  getAllTables: (params: GetAllTablesParams) => Promise<void>;
  tables: Ref<Table[]>;
}

export interface GetAllTablesParams {
  page?: number;
  pageSize?: number;
  title?: string;
}

export function useGetAllTables(): UseGetAllTablesReturn {
  const { sendRequest, clearError, response, error, status, isLoading } =
    useFetch<GetAllTablesResponse, GetAllTablesError, GetAllTablesData>(
      TablesService.getAllTables
    )

  const tableStore = useTableStore()

  const getAllTables = async (params: GetAllTablesParams): Promise<void> => {
    tableStore.clearTables()

    await sendRequest({
      query: {
        page: params.page,
        page_size: params.pageSize,
      }
    })
  }

  const tables = ref<Table[]>([])

  const saveTables = (): void => {
    const res = response.value
    if (!res || !res.data) return

    tables.value = res.data as unknown as Table[]
    tableStore.saveAllTables(tables.value)
  }

  watch(response, saveTables)

  const { paginationMeta } = usePaginationMeta({ response })

  return {
    getAllTables,
    clearError,
    tables,
    paginationMeta,
    error,
    status,
    isLoading
  }
}
