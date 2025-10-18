import type { Serializer } from '@vueuse/core'

export const stringSerializer: Serializer<string | null> = {
  read: (token: string): string | null => {
    return token ? token : null
  },
  write: (token: string | null): string => {
    return token ? token : ''
  }
}