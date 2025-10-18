import type { EventBusKey } from '@vueuse/core'

export const SUCCES_LOGIN_REDIRECT_BUS_KEY: EventBusKey<void> = Symbol('succes-login:redirect')
export const LOGOUT_REDIRECT_BUS_KEY: EventBusKey<void> = Symbol('logout:redirect')