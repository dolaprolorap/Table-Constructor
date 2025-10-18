import type { EventBusKey } from '@vueuse/core'

export const HOME_REDIRECT_BUS_KEY: EventBusKey<void> = Symbol('home:redirect')

export const ID_PARAM_NAME = 'id'