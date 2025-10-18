import { useEventBus } from '@vueuse/core'

import { UNAUTHORIZED_BUS_KEY } from '@/shared/config/router'

interface UseEmitUnauthorizedReturn {
	emitUnauthorized: () => void;
}

export function useEmitUnauthorized(): UseEmitUnauthorizedReturn {
	const unauthorizedEvent = useEventBus(UNAUTHORIZED_BUS_KEY)

	const emitUnauthorized = (): void => {
		unauthorizedEvent.emit()
	}

	return { emitUnauthorized }
}