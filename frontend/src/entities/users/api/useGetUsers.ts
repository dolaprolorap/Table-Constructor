import { watch } from 'vue'

import { useFetch, usePaginationMeta, type ApiServiceReturnWithPaginationMeta } from '@/shared/api'
import { UsersService, type GetUsersData, type GetUsersError, type GetUsersResponse } from '@/shared/api/openapi/client'

import { mapApiToUser } from '../lib/apiMappers'
import { rolesToApiMapper } from '../lib/rolesApiMappers'
import type { UserRoles } from '../model/Roles'
import { useUsersStore } from '../model/UsersStore'

interface UseGetUsersReturn extends ApiServiceReturnWithPaginationMeta<GetUsersError> {
	getUsers: (params: GetUsersParams) => Promise<void>;
}

interface GetUsersParams {
	login?: string;
	role?: UserRoles;
	page?: number;
	pageSize?: number;
}

export function useGetUsers(): UseGetUsersReturn {
	const { sendRequest, clearError, response, error, status, isLoading }
		= useFetch<
			GetUsersResponse,
			GetUsersError,
			GetUsersData
		>(UsersService.getUsers)

	const usersStore = useUsersStore()

	const getUsers = async(params: GetUsersParams): Promise<void> => {
		usersStore.clearUsers()

		await sendRequest({
			query: {
				login: params?.login,
				role: params.role ? rolesToApiMapper[params.role] : undefined,
				page: params.page,
				page_size: params.pageSize
			}
		})
	}

	const saveUsers = (): void => {
		const responseValue = response.value

		if (!responseValue || !responseValue.data) {
			return
		}

		const users = responseValue.data.map(mapApiToUser)

		usersStore.setUsers(users)
	}

	watch(response, saveUsers)

	const { paginationMeta } = usePaginationMeta({ response })

	return {
		getUsers,
		clearError,
		paginationMeta,
		error,
		status,
		isLoading
	}
}