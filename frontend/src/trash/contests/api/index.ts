import type {
  Contest as ContestApi,
  ContestRequestBody
} from '@/shared/api/openapi/client'

import { useCreateContest } from './services/useCreateContest'
import { useDeleteContest } from './services/useDeleteContest'
import { useGetAllContests } from './services/useGetAllContests'
import { useUpdateContest } from './services/useUpdateContest/useUpdateContest'

export { useCreateContest, useGetAllContests, useDeleteContest, useUpdateContest }

export type { ContestApi, ContestRequestBody }