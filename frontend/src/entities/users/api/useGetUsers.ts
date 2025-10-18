import { watch } from 'vue'

import { useFetch, usePaginationMeta, type ApiServiceReturnWithPaginationMeta } from '@/shared/api'
import { AchievementsService, type GetAllAchievementsData, type GetAllAchievementsError, type GetAllAchievementsResponse } from '@/shared/api/openapi/client'

import { AchievementStatusesToApiMapper } from '../../lib/mappers/achievementStatusesApiMappers'
import { mapAchievementApiToAchievement } from '../../lib/mappers/apiMappers'
import { isAchievementExtended } from '../../lib/typeGuards/achievementTypeGuards'
import type { AchievementStatuses } from '../../model/AchievementStatuses'
import { useAchievementStore } from '../../model/AchievementStore'

interface UseGetAllAchievementsReturn extends ApiServiceReturnWithPaginationMeta<GetAllAchievementsError> {
	getAllAchievements: (params: GetAllAchievementsParams) => Promise<void>;
}

interface GetAllAchievementsParams {
	title?: string;
	status?: AchievementStatuses;
	categorySlugs?: string[];
	page?: number;
	pageSize?: number;
	achievementSchemesId?: number[];
}

export function useGetAllAchievements(): UseGetAllAchievementsReturn {
	const { sendRequest, clearError, response, error, status, isLoading }
		= useFetch<
			GetAllAchievementsResponse,
			GetAllAchievementsError,
			GetAllAchievementsData
		>(AchievementsService.getAllAchievements)

	const achievementStore = useAchievementStore()

	const getAllAchievements = async(params: GetAllAchievementsParams): Promise<void> => {
		achievementStore.clearAchievements()

		await sendRequest({
			query: {
				title: params.title,
				status: params.status && AchievementStatusesToApiMapper[params.status],
				'category_slugs[]': params.categorySlugs,
				'schema_ids[]': params.achievementSchemesId,
				page: params.page,
				page_size: params.pageSize,
				include: 'achievement_schema,category,user,userInfo'
			}
		})
	}

	const saveAchievements = (): void => {
		const responseValue = response.value

		if (!responseValue || !responseValue.data || !responseValue.included) {
			return
		}

		const achievementsFiltered = responseValue.data.
			map(achievement => {
				return mapAchievementApiToAchievement(achievement, responseValue.included)
			}).
			filter(isAchievementExtended)

		achievementStore.setAchievements(achievementsFiltered)
	}

	watch(response, saveAchievements)

	const { paginationMeta } = usePaginationMeta({ response })

	return {
		getAllAchievements,
		clearError,
		paginationMeta,
		error,
		status,
		isLoading
	}
}