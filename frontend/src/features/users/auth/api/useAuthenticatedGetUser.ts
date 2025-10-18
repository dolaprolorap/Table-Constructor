import { ref, watch, type Ref } from 'vue'

import { useFetch, type ApiServiceReturn } from '@/shared/api'
import { AuthService, type GetAuthenticatedUserError, type GetAuthenticatedUserResponse } from '@/shared/api/openapi/client'

import { mapApiToUser } from '../../../../entities/users/lib/apiMappers'
import type { User } from '../../../../entities/users/model/User'

interface UseGetAuthenticatedUserReturn extends ApiServiceReturn<GetAuthenticatedUserError> {
	getAuthenticatedUser: () => Promise<void>;
	user: Ref<User | null>;
}

export function useGetAuthenticatedUser(): UseGetAuthenticatedUserReturn {
	const user = ref<User | null>(null)

	const { sendRequest, clearError, response, error, status, isLoading }
		= useFetch<
			GetAuthenticatedUserResponse,
			GetAuthenticatedUserError,
			object
		>(AuthService.getAuthenticatedUser)

	const getAuthenticatedUser = async(): Promise<void> => {
		user.value = null

		await sendRequest({})
	}

	const saveUser = (): void => {
		const responseValue = response.value

		if (!responseValue) {
			return
		}

		user.value = mapApiToUser(responseValue)
	}

	watch(response, saveUser)

	return {
		getAuthenticatedUser,
		clearError,
		user,
		error,
		status,
		isLoading
	}
}