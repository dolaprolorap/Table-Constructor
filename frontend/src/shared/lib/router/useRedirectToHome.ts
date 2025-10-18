import { useEventBus } from '@vueuse/core'

import { HOME_REDIRECT_BUS_KEY } from '@/shared/config/router'

interface UseRedirectToHomeReturn {
  redirectToHome: () => void;
}

export function useRedirectToHome(): UseRedirectToHomeReturn {
  const homeRedirect = useEventBus(HOME_REDIRECT_BUS_KEY)

  const redirectToHome = (): void => {
    homeRedirect.emit()
  }

  return { redirectToHome }
}