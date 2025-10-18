import { useEventBus } from '@vueuse/core'
import { watch } from 'vue'

import { DATA_REFRESHED_BUS_KEY, useCreatedId, useFetch, type ApiCreateServiceReturn } from '@/shared/api'
import { type CreateContestData, type CreateContestResponse, type CreateContestError, ContestsService } from '@/shared/api/openapi/client'

import { mapContestToApiFullRequestBody } from '../../lib/mappers/apiMappers'
import type { ContestAttributes } from '../../model/types/contestType'

interface UseCreateContestReturn extends ApiCreateServiceReturn<CreateContestError> {
  createContest: (params: CreateContestParams) => Promise<void>;
}

interface CreateContestParams extends ContestAttributes {}

export function useCreateContest(): UseCreateContestReturn {

  const {
    sendRequest,
    clearError,
    response,
    error,
    status,
    isLoading
  } = useFetch<
    CreateContestResponse,
    CreateContestError,
    CreateContestData
  >(ContestsService.createContest)

  const createContest = async(params: CreateContestParams): Promise<void> => {
    clearError()

    await sendRequest({
      body: mapContestToApiFullRequestBody(params)
    })
  }

  const dataRefreshed = useEventBus(DATA_REFRESHED_BUS_KEY)

  const { createdId } = useCreatedId({ response })

  const callContestsRefresh = (): void => {
    if (!createdId.value) {
      return
    }

    dataRefreshed.emit({ mutationType: 'create' })
  }

  watch(createdId, callContestsRefresh)

  return {
    createContest,
    clearError,
    createdId,
    error,
    status,
    isLoading
  }
}