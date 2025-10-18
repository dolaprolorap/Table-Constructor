import { watch } from 'vue'

import { ApiStatuses, useFetch, type ApiServiceReturn } from '@/shared/api'
import { ContestsService, type FullUpdateContestData, type FullUpdateContestResponse, type FullUpdateContestError } from '@/shared/api/openapi/client'

import { useContestStore, type Contest } from '@/entities/contests'
import { mapContestToApiFullRequestBody } from '@/entities/contests/lib/mappers/apiMappers'

interface UpdateContestParams extends Contest {}

interface UseUpdateContestReturn extends ApiServiceReturn<FullUpdateContestError> {
  fullUpdateContest: (params: UpdateContestParams) => Promise<void>;
}

export function useFullUpdateContest(): UseUpdateContestReturn {

  const {
    sendRequest,
    clearError,
    error,
    status,
    isLoading }
  = useFetch<
    FullUpdateContestResponse,
    FullUpdateContestError,
    FullUpdateContestData
  >(ContestsService.fullUpdateContest)

  let updateContestData: UpdateContestParams | null = null

  const fullUpdateContest = async(params: UpdateContestParams): Promise<void> => {
    clearError()

    updateContestData = params

    await sendRequest({
      body: mapContestToApiFullRequestBody(params),
      path : {
        id: params.id
      }
    })
  }

  const contestStore = useContestStore()

  const syncUpdateWithStore = (): void => {
    if(status.value !== ApiStatuses.success || !updateContestData) {
      return
    }

    const { id } = updateContestData

    const oldContest = contestStore.getContestById(id)

    if (!oldContest) {
      return
    }

    contestStore.updateContest(updateContestData)
  }

  watch(status, syncUpdateWithStore)

  return { fullUpdateContest, clearError, error, status, isLoading }
}