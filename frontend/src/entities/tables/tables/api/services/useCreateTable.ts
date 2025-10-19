import { useEventBus } from '@vueuse/core'
import { watch } from 'vue'

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

export interface CreateTableParams {
    title: string
}

function mapTableToApiRequestBody(params: CreateTableParams): CreateTableData {
    return {
        data: {
            title: params.title,
        },
    }
}

interface UseCreateTableReturn extends ApiCreateServiceReturn<CreateTableError> {
    createTable: (params: CreateTableParams) => Promise<void>;
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
            body: mapTableToApiRequestBody(params),
        })
    }

    const dataRefreshed = useEventBus(DATA_REFRESHED_BUS_KEY)

    const { createdId } = useCreatedId({ response })

    const emitTablesRefresh = (): void => {
        if (!createdId.value) return
        dataRefreshed.emit({ mutationType: 'create' })
    }

    watch(createdId, emitTablesRefresh)

    return {
        createTable,
        clearError,
        createdId,
        error,
        status,
        isLoading,
    }
}
