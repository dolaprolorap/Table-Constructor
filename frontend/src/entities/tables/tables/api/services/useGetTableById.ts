import { useMemoize } from '@vueuse/core'
import { watch } from 'vue'

import { type ApiServiceReturn, useFetch } from '@/shared/api'
import {
    type GetTableByIdData,
    type GetTableByIdResponse,
    type GetTableByIdError,
    TablesService
} from '@/shared/api/openapi/client'

import { mapApiToAchievementScheme } from '../../lib/mappers/apiMappers'
import { useAchievementFormSchemesStore } from '../../model/useAchievementFormSchemesStore'

interface UseGetAchievementSchemesByIdReturn extends ApiServiceReturn<GetFormSchemeByIdError> {
    getAchievementSchemeById: (params: GetAchievementSchemesByIdParams) => Promise<void>;
}

interface GetAchievementSchemesByIdParams {
    id: number;
}

export function useGetTableById(): UseGetAchievementSchemesByIdReturn {

    const {
        sendRequest,
        clearError,
        response,
        error,
        status,
        isLoading
    } = useFetch<
        GetFormSchemeByIdResponse,
        GetFormSchemeByIdError,
        GetFormSchemeByIdData
    >(AchievementSchemesService.getFormSchemeById)

    const getAchievementSchemeById = useMemoize(async (params: GetAchievementSchemesByIdParams): Promise<void> => {
        clearError()

        await sendRequest({
            path: {
                id: params.id
            },
            query: {
                include: 'category'
            }
        })
    })

    const achievementSchemesStore = useAchievementFormSchemesStore()

    const saveAchievementScheme = (): void => {
        if (!response.value || !response.value.data || !response.value.included) {
            return
        }

        const achievementScheme = mapApiToAchievementScheme(response.value.data, response.value.included)

        if (achievementScheme?.type !== 'extended') {
            return
        }

        achievementSchemesStore.addAchievementScheme(achievementScheme)
    }

    watch(response, saveAchievementScheme)

    return {
        getAchievementSchemeById,
        clearError,
        error,
        status,
        isLoading
    }
}