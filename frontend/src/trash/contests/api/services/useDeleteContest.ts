import { useEventBus } from '@vueuse/core'
import { watch } from 'vue'

import { DATA_REFRESHED_BUS_KEY, ApiStatuses, useFetch, type ApiServiceReturn } from '@/shared/api'
import { ContestsService, type DeleteContestData, type DeleteContestError, type DeleteContestResponse } from '@/shared/api/openapi/client'

interface UseDeleteContestReturn extends ApiServiceReturn<DeleteContestError> {
  deleteContest: (params: DeleteContestParams) => Promise<void>;
}

interface DeleteContestParams {
  contestId: number;
}

export function useDeleteContest(): UseDeleteContestReturn {
  const {
    sendRequest,
    clearError,
    error,
    status,
    isLoading }
    = useFetch<
      DeleteContestResponse,
      DeleteContestError,
      DeleteContestData
    >(ContestsService.deleteContest)

  const deleteContest = async(params: DeleteContestParams): Promise<void> => {
    clearError()

    await sendRequest({
      path: {
        id: params.contestId
      }
    })
  }

  const dataRefreshed = useEventBus(DATA_REFRESHED_BUS_KEY)

  const callContestsRefresh = (): void =>{
    if (status.value !== ApiStatuses.success) {
      return
    }

    dataRefreshed.emit({ mutationType: 'delete' })
  }

  watch(status, callContestsRefresh)

  return { deleteContest, clearError, error, status, isLoading }
}