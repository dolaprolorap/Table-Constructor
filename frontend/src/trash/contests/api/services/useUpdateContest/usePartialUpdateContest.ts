import { watch } from 'vue'

import { ApiStatuses, useFetch, type ApiServiceReturn } from '@/shared/api'
import { ContestsService, type PartialUpdateContestData, type PartialUpdateContestResponse, type PartialUpdateContestError } from '@/shared/api/openapi/client'
import { formatDate } from '@/shared/lib/date'

import { useContestStore, type Contest } from '@/entities/contests'

interface UpdateContestParams extends Contest {}

interface UseUpdateContestReturn extends ApiServiceReturn<PartialUpdateContestError> {
  partialUpdateContest: (params: UpdateContestParams) => Promise<void>;
}

export function usePartialUpdateContest(): UseUpdateContestReturn {

  const {
    sendRequest,
    clearError,
    error,
    status,
    isLoading
  } = useFetch<
    PartialUpdateContestResponse,
    PartialUpdateContestError,
    PartialUpdateContestData
  >(ContestsService.partialUpdateContest)

  let updateContestData: UpdateContestParams | null = null

  const partialUpdateContest = async(params: UpdateContestParams): Promise<void> => {
    clearError()

    updateContestData = params

    await sendRequest({
      body: {
        data : {
          type: 'contests',
          attributes: {
            title: params.title,
            description: params.description,
            end_at: formatDate(params.endDate, 'yyyy-MM-dd HH:mm:ss')
          }
        }
      },
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

  return { partialUpdateContest, clearError, error, status, isLoading }
}