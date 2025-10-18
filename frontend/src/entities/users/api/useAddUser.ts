import { watch } from 'vue'

import { type ApiCreateServiceReturn, useCreatedId, useFetch } from '@/shared/api'
import {
	type AddUserData,
	type AddUserError,
	type AddUserResponse,
	UsersService
} from '@/shared/api/openapi/client'

import { rolesToApiMapper } from '../lib/rolesApiMappers'
import type { UserRoles } from '../model/Roles'
import type { User } from '../model/User'
import { useUsersStore } from '../model/UsersStore'

interface UseAddUserReturn extends ApiCreateServiceReturn<AddUserError> {
	addUser: (params: AddUserParams) => Promise<void>;
}

interface AddUserParams {
	login: string;
	firstName: string;
	lastName: string;
	middleName: string;
	role: UserRoles;
	password: string;
}

export function useAddUser(): UseAddUserReturn {

	const {
		sendRequest,
		clearError,
		response,
		error,
		status,
		isLoading
	} = useFetch<
		AddUserResponse,
		AddUserError,
		AddUserData
	>(UsersService.addUser)

	let userCached: AddUserParams | null = null

	const addUser = async(params: AddUserParams): Promise<void> => {
		clearError()

		userCached = params

		await sendRequest({
			body: {
				data: {
					login: params.login,
					first_name: params.firstName,
					last_name: params.lastName,
					middle_name: params.middleName,
					role: rolesToApiMapper[params.role],
					password: params.middleName,
				}
			}
		})
	}

	const usersStore = useUsersStore()

	const { createdId } = useCreatedId({ response })

	const saveUser = (): void => {

		if (!userCached || !createdId.value) {
			return
		}

		const newUser: User = {
			id: createdId.value,
			login: userCached.login,
			first_name: userCached.firstName,
			last_name: userCached.lastName,
			middle_name: userCached.middleName,
			role: userCached.role
		}

		usersStore.addUser(newUser)
	}

	watch(createdId, saveUser)

	return {
		addUser,
		clearError,
		createdId,
		error,
		status,
		isLoading
	}
}