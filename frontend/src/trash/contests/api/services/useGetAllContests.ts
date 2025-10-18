import { ref, watch, type Ref } from 'vue'

import { useFetch, usePaginationMeta, type ApiServiceReturnWithPaginationMeta } from '@/shared/api'
import {
  ContestsService,
  type GetAllContestsError,
  type GetAllContestsResponse,
  type GetAllContestsData }
  from '@/shared/api/openapi/client'

import { useContestStore, type Contest } from '@/entities/contests'

import { mapApiToContest } from '../../lib/mappers/apiMappers'
import { contestStatusToApiMapper } from '../../lib/mappers/contestStatusesApiMappers'
import type { ContestStatuses } from '../../model/ContestStatuses'

interface UseGetAllContestsReturn extends ApiServiceReturnWithPaginationMeta<GetAllContestsError> {
  getAllContests: (params: GetAllContestsParams) => Promise<void>;
  contests: Ref<Contest[]>;
}

export interface GetAllContestsParams {
  status?: ContestStatuses;
  include?: 'categories';
  page?: number;
  pageSize?: number;
  title?: string;
}

export function useGetAllContests(): UseGetAllContestsReturn {

  const { sendRequest, clearError, response, error, status, isLoading }
  = useFetch<
    GetAllContestsResponse,
    GetAllContestsError,
    GetAllContestsData
  >(ContestsService.getAllContests)

  const contestsStore = useContestStore()

  const getAllContests = async(params: GetAllContestsParams): Promise<void> => {

    contestsStore.clearContests()

    await sendRequest({
      query: {
        include: 'categories',
        active_only: params.status ? contestStatusToApiMapper[params.status] : params.status,
        page: params.page,
        page_size: params.pageSize,
        title: params.title
      }
    })
  }

  const contests = ref<Contest[]>([])

  const saveContests = async(): Promise<void> => {
    const responseValue = response.value

    if (!responseValue) {
      return
    }

    if (!responseValue.data) {
      return
    }

    if (!responseValue.included) {
      return
    }

    const includedCategories = responseValue.included

    contests.value = responseValue.data.map((contestApi)=>{
      return mapApiToContest(contestApi, includedCategories)
    })

    contestsStore.saveAllContests( contests.value)
  }

  watch(response, saveContests)

  const { paginationMeta } = usePaginationMeta({ response })

  return {
    getAllContests,
    clearError,
    contests,
    paginationMeta,
    error,
    status,
    isLoading
  }
}