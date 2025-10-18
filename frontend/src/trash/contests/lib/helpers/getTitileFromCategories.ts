import type { Contest, NewContest } from '@/entities/contests'

export const getTitleFromContestCategories = (contest: Contest | NewContest): string[] => {

  return contest.categories?.map((category) => {
    return category.title
  }) ?? []
}
