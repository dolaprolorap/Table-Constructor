import { computed, type ComputedRef, type Ref } from 'vue'

import { mapApiResponseToPaginationMeta } from './mapApiResponseToPaginationMeta'
import type { ResponseWithPaginationMeta } from './types'
import type { PaginationMeta } from '../../types'

interface UsePaginationMetaParams {
  response: Ref<ResponseWithPaginationMeta | null>;
}

interface UsePaginationMetaReturn {
  paginationMeta: ComputedRef<PaginationMeta | null>;
}

export function usePaginationMeta({ response }: UsePaginationMetaParams): UsePaginationMetaReturn {
  const paginationMeta = computed<PaginationMeta | null>(()=>{
    const apiResponse = response.value

    if (!apiResponse) {
      return null
    }

    return mapApiResponseToPaginationMeta(apiResponse)
  })

  return { paginationMeta }
}