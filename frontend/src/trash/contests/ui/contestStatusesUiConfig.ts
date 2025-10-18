import { ContestStatuses } from '../model/ContestStatuses'

export const ContestStatusesRu = {
  [ContestStatuses.active]: 'активен',
  [ContestStatuses.upcoming]: 'предстоит',
  [ContestStatuses.archive]: 'архивирован'
} as const

export const ContestStatusesColors = {
  [ContestStatuses.active]: 'success',
  [ContestStatuses.upcoming]: 'primary',
  [ContestStatuses.archive]: 'secondary'
} as const
