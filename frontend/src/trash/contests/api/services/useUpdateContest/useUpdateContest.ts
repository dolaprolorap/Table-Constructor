import { computed, type Ref } from 'vue'

import { type ApiServiceReturn } from '@/shared/api'
import type { FullUpdateContestError, PartialUpdateContestError } from '@/shared/api/openapi/client'

import { isContestFullUpdateble, type Contest } from '@/entities/contests'

import { useFullUpdateContest } from './useFullUpdateContest'
import { usePartialUpdateContest } from './usePartialUpdateContest'

interface UseUpdateContestParams {
  contest: Ref<Contest>;
}

interface UseUpdateContestReturn extends ApiServiceReturn<FullUpdateContestError | PartialUpdateContestError> {
  updateContest: (param: UpdateContestParams) => Promise<void>;
}

interface UpdateContestParams extends Contest {}

export function useUpdateContest({ contest }: UseUpdateContestParams): UseUpdateContestReturn {

  const fullUpdatebleContest = computed(() => {
    return isContestFullUpdateble(contest.value)
  })

  if(fullUpdatebleContest.value) {
    const { fullUpdateContest, error, status, isLoading, clearError } = useFullUpdateContest()

    return {
      updateContest : fullUpdateContest,
      error,
      status,
      isLoading,
      clearError
    }
  }

  const { partialUpdateContest, error, status, isLoading, clearError } = usePartialUpdateContest()

  return {
    updateContest : partialUpdateContest,
    error,
    status,
    isLoading,
    clearError
  }

}