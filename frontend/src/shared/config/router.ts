import type { EventBusKey } from '@vueuse/core'

export const HOME_REDIRECT_BUS_KEY: EventBusKey<void> = Symbol('home:redirect')
export const UNAUTHORIZED_BUS_KEY: EventBusKey<void> = Symbol('unauthorized:redirect')

export const ID_PARAM_NAME = 'id'
