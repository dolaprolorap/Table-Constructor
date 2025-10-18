import { computed, type ComputedRef, type Ref } from 'vue'

interface BaseObjectResponse {
	data: {
		id: number;
	};
}

interface UseCreateIdParams {
	response: Ref<BaseObjectResponse | null>;
}

interface UseCreateIdReturn {
	createdId: ComputedRef<number | null>;
}

export function useCreatedId({ response }: UseCreateIdParams): UseCreateIdReturn {

	const setCreatedId = (): number | null => {
		const responseValue = response.value

		if (!responseValue) {
			return null
		}

		const id = responseValue.data.id

		return id || null
	}

	const createdId = computed<number | null>(setCreatedId)

	return { createdId }

}