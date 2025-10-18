import { useDebouncedModelValue } from './model/useDebouncedModelValue'
import { useOptionsVisibilityHandlers } from './model/useOptionsVisibilityHandlers'
import BaseOptionsDropdown from './ui/BaseOptionsDropdown/BaseOptionsDropdown.vue'
import FieldErrorMessage from './ui/FieldErrorMessage.vue'
import SelectOptionsDropdown from './ui/SelectOptionsDropdown.vue'

export {
  FieldErrorMessage,
  SelectOptionsDropdown,
  BaseOptionsDropdown,
  useDebouncedModelValue,
  useOptionsVisibilityHandlers
}

// All values in options need to be unique
export type { SelectOption, AllOption, NoneOption } from './model/types'
export { DefaultSelectOptions } from './model/types'
export * as FormControlsSharedConfig from './config'