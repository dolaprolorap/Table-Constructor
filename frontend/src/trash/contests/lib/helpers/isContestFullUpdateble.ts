import { ContestStatuses } from '../../model/ContestStatuses'
import type { Contest } from '../../model/types/contestType'

export const isContestFullUpdateble = (contest: Contest): boolean => {
  return contest.status === ContestStatuses.upcoming
}