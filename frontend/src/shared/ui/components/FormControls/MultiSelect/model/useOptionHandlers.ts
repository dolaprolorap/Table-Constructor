import type { SelectOption } from '../../shared'
import type { Ref } from 'vue'

interface OptionHandlerParams {
  options: Ref<SelectOption[]>;
  selectedOptions: Ref<string[]>;
}

interface OptionHandlerReturn {
  toggleAllOptions: () => void;
  toggleOption: (option: SelectOption) => void;
  unselectOption: (value: string) => void;
  clearSelected: () => void;
  checkOption: (option: SelectOption) => boolean;
  getLabelByValue: (value: string) => string;
}

export function useOptionHandlers({ options, selectedOptions }: OptionHandlerParams): OptionHandlerReturn {
  const toggleAllOptions = (): void => {
    if (selectedOptions.value.length === options.value.length) {
      selectedOptions.value = []

      return
    }

    selectedOptions.value = options.value.map((option)=>{
      return option.value
    })
  }

  const toggleOption = (toggledOption: SelectOption): void => {
    if (selectedOptions.value.includes(toggledOption.value)) {
      selectedOptions.value = selectedOptions.value.filter((option)=>{
        return option !== toggledOption.value
      })

      return
    }

    selectedOptions.value.push(toggledOption.value)
  }

  const unselectOption = (unselectValue: string ): void => {
    selectedOptions.value = selectedOptions.value.filter((option)=>{
      return option !== unselectValue
    })
  }

  const clearSelected = (): void => {
    selectedOptions.value = []
  }

  const checkOption = (option: SelectOption): boolean => {
    return selectedOptions.value.includes(option.value)
  }

  const getLabelByValue = (value: string): string => {
    const label = options.value.find((option)=>{
      return option.value === value
    })?.label

    if(!label) {
      return ''
    }

    return label
  }

  return { toggleAllOptions, toggleOption, unselectOption, clearSelected, checkOption, getLabelByValue }
}