import { useMemoize } from '@vueuse/core'
import { ref, watch, type Ref } from 'vue'

import { type ApiServiceReturn, useFetch } from '@/shared/api'
import {
    type GetTableByIdData,
    type GetTableByIdResponse,
    type GetTableByIdError,
    TablesService
} from '@/shared/api/openapi/client'

import type { TableWithColumns } from '../../model/types/tablesType'
import { mapApiToTableWithColumns } from '../../lib/mappers/apiMappers'

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

    const getTableById = useMemoize(async (params: GetTableByIdParams): Promise<void> => {
        clearError()
        table.value = null

        await sendRequest({
            path: {
                id: params.id
            }
        })
    })

    const saveTable = (): void => {
        if (!response.value) {
            return
        }

        table.value = mapApiToTableWithColumns(response.value)
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