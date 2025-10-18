import { shallowRef, computed, type ComputedRef, type Ref, ref } from 'vue'

import { ApiStatuses } from '../config/statuses'
import type { ServerError, ApiServiceErrorReturn, ResponseHeaders } from '../types'
import type { RequestResult } from '@hey-api/client-axios'

interface FetchReturn<ResponseType, ErrorType, RequestOptionsType>
	extends ApiServiceErrorReturn<ErrorType> {
	status: Readonly<Ref<ApiStatuses>>;
	isLoading: ComputedRef<boolean>;
	response: Ref<ResponseType | null>;
	headers: Ref<ResponseHeaders | null>;
	clearError: () => void;
	sendRequest: (requestBody: RequestOptionsType) => Promise<void>;
}

export function useFetch<
	ResponseType,
	ErrorType,
	RequestOptionsType = void
>(
	requestMethod: (options: RequestOptionsType) => RequestResult<ResponseType, ErrorType>
): FetchReturn<ResponseType, ErrorType, RequestOptionsType> {

	const responseData = shallowRef<ResponseType | null>(null)
	const responseHeaders = shallowRef<ResponseHeaders | null>(null)
	const responseError = shallowRef<ServerError<ErrorType> | null>(null)

	const clearError = (): void => {
		responseError.value = null
	}

	const responseStatus = ref<ApiStatuses>(ApiStatuses.none)

	const isLoading = computed(() => {
		return responseStatus.value === ApiStatuses.pending
	})

	const sendRequest = async(requestBody: RequestOptionsType): Promise<void> => {
		clearError()

		responseStatus.value = ApiStatuses.pending

		try {
			const response = await requestMethod(requestBody)

			if ('error' in response) {
				responseError.value = { errorInfo: response.error }
				responseStatus.value = ApiStatuses.error
			}
			else {
				responseData.value = response.data ?? null
				responseHeaders.value = response.headers ?? null
				responseStatus.value = ApiStatuses.success
			}
		}
		catch(error) {
			responseError.value = { errorInfo: 'unknown error' }
			responseStatus.value = ApiStatuses.error
		}
	}

	return {
		sendRequest,
		clearError,
		response: responseData,
		headers: responseHeaders,
		error: responseError,
		status: responseStatus,
		isLoading
	}
}
