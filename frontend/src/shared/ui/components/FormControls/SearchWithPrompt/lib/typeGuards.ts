import type { SelectOption } from '../../shared'
import type { SearchWithPromptOption } from '../model/types'

export function isSearchWithPromptOption(selectOption: SelectOption): selectOption is SearchWithPromptOption {
  return 'searchValue' in selectOption && typeof selectOption.searchValue === 'string'
}