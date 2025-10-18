import { UTCDate } from '@date-fns/utc'

import { formatDate } from '@/shared/lib/date'

import { mapApiToAchievementCategory, isAchievementCategoryApi, type AchievementCategory, type AchievementCategoryApi } from '@/entities/achievements/categories/@x/contests'

import type { ContestApi, ContestRequestBody } from '../../api'
import { ContestStatuses } from '../../model/ContestStatuses'
import type { ContestAttributes, Contest } from '../../model/types/contestType'

function getContestStatus(startDate: Date, endDate: Date): ContestStatuses {
  const currentDate = new UTCDate()

  if (startDate <= currentDate && currentDate <= endDate) {
    return ContestStatuses.active
  }

  if (endDate < currentDate) {
    return ContestStatuses.archive
  }

  return ContestStatuses.upcoming
}

export function mapApiToContest(contestApi: ContestApi, includedData: unknown[]): Contest {
  const includedCategories: AchievementCategoryApi[] = includedData.filter(isAchievementCategoryApi)

  const contestCategories: AchievementCategory[] = contestApi.relationships.categories.data
    .map((category) => {

      const replaceCategory = includedCategories.find((includedCategory) => {
        return includedCategory.id === category.id
      })

      return replaceCategory || null
    })
    .filter((category) => {
      return !!category
    })
    .map((category)=>{
      return mapApiToAchievementCategory(category as AchievementCategoryApi)
    })

  const startDate = new UTCDate(contestApi.attributes.start_at)
  const endDate = new UTCDate(contestApi.attributes.end_at)

  const contestStatus = getContestStatus(startDate, endDate)

  const contest: Contest = {
    id: Number(contestApi.id),
    title: contestApi.attributes.title,
    description: contestApi.attributes.description,
    categories: contestCategories,
    startDate,
    endDate,
    status: contestStatus
  }

  return contest
}

export function mapContestToApiFullRequestBody(contest: ContestAttributes): ContestRequestBody {
  const mappedCategories = contest.categories.map((category) => {
    return Number(category.id)
  })

  return {
    data: {
      type: 'contests',
      attributes: {
        title: contest.title,
        description: contest.description,
        start_at: formatDate(contest.startDate, 'yyyy-MM-dd HH:mm:ss'),
        end_at: formatDate(contest.endDate, 'yyyy-MM-dd HH:mm:ss'),
        category_ids: mappedCategories
      }
    }
  }
}
