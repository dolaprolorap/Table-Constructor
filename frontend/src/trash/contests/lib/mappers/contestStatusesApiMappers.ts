import { ContestStatuses } from '../../model/ContestStatuses'

// Значения для upcoming и для achive пока не играют роли в бизнес логики
export const contestStatusToApiMapper = {
  [ContestStatuses.active]: true,
  [ContestStatuses.upcoming]: true,
  [ContestStatuses.archive]: false
} as const