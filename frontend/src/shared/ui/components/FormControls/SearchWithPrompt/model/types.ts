import type { SelectOption } from '../../shared'

export interface SearchWithPromptOption extends SelectOption {
  searchValue: string;
}