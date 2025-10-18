import { watch } from 'vue'

import { type ApiServiceReturn, ApiStatuses, useFetch } from '@/shared/api'
import {
	type DeleteUserData,
	type DeleteUserError,
	type DeleteUserResponse,
	UsersService
} from '@/shared/api/openapi/client'

import { useUsersStore } from '../model/UsersStore'

interface UseDeleteUserByIdReturn extends ApiServiceReturn<DeleteUserError> {
	deleteUserById: (params: DeleteUserByIdParams) => Promise<void>;
}

interface DeleteUserByIdParams {
	userId: number;
}

export function useDeleteUserById(): UseDeleteUserByIdReturn {

	const {
		sendRequest,
		clearError,
		error,
		status,
		isLoading }
		= useFetch<
			DeleteUserResponse,
			DeleteUserError,
			DeleteUserData
		>(UsersService.deleteUser)

	let deletedUserId: number | null = null

	const deleteUserById = async(params: DeleteUserByIdParams): Promise<void> => {
		clearError()

		deletedUserId = params.userId

		await sendRequest({
			path: {
				id: params.userId
			}
		})
	}

	const usersStore = useUsersStore()

	const removeUser = (): void => {
		if (!deletedUserId || status.value !== ApiStatuses.success) {
			return
		}

		usersStore.removeUser(deletedUserId)
	}

	watch(status, removeUser)

	return {
		deleteUserById,
		clearError,
		error,
		status,
		isLoading
	}
}