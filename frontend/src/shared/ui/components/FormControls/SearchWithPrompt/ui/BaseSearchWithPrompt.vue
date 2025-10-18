<template>
  <div class="search-with-prompts__container">
    <BaseFormInput
      :id="SEARCH_INPUT_ID"
      v-model="searchString"

      :label="label"
      :required="required"
      :custom-class="customClass"
      :placeholder="placeholder"
      :invalid="!!feedbackInvalid"
      :autocomplete="false"

      :name="nameSearch"

      @focusin="setOptionsVisible"
    />

    <SelectOptionsDropdown
      ref="OptionsDropdown"
      :options="options"
      :empty-message="emptyMessage"
      :is-loading="isLoading"
      :options-are-visible="optionsAreVisible"
      :has-label="!!label"

      :total-pages="lastPage"

      :load-more="loadMore"

      @click-outside="setOptionsUnvisible"
      @select-option="selectOption"
    />

    <FieldErrorMessage
      v-if="feedbackInvalid"
      :error-message="feedbackInvalid"
    />
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed, toRefs, useTemplateRef, watch } from 'vue'

import { BASE_DEBOUNCE } from '@/shared/config/debounce'

import BaseFormInput from '../../BaseFormInput.vue'
import {
  useDebouncedModelValue,
  useOptionsVisibilityHandlers,
  SelectOptionsDropdown,
  FieldErrorMessage,
  type SelectOption
} from '../../shared'
import { isSearchWithPromptOption } from '../lib/typeGuards'
import type { SearchWithPromptOption } from '../model/types'

interface BaseSearchWithPromptProps {
  id: string;
  options: SearchWithPromptOption[];

  customClass?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;

  // Значение name для значения
  name: string;
  // Значение name для поисковой строки
  nameSearch: string;

  lastPage: number;
  isLoading: boolean;
  emptyMessage?: string;

  loadMore: (currentPage: number) => void;
}

const props = defineProps<BaseSearchWithPromptProps>()

const { id, name } = toRefs(props)

interface BaseSearchWithPromptEmits {
  (event: 'select', value: string): void;
  (event: 'clear'): void;
}

const emit = defineEmits<BaseSearchWithPromptEmits>()

const SEARCH_INPUT_ID = `${id.value}-input`

const {
  errorMessage, setValue, meta
} = useField<string | null>(name.value)

const searchModel = defineModel<string>('search-string', { default: '' })

const selectedValue = defineModel<SearchWithPromptOption | null>('selected-value', { default: null })

const { inputValue: searchString } = useDebouncedModelValue({ inputModel: searchModel, debounce: BASE_DEBOUNCE })

const { optionsAreVisible, setOptionsUnvisible, setOptionsVisible } = useOptionsVisibilityHandlers({ selectInputId: SEARCH_INPUT_ID })

const selectOption = (option: SelectOption): void => {
  if (!isSearchWithPromptOption(option)) {
    return
  }

  searchModel.value = option.searchValue
  selectedValue.value = option
  setValue(option.value)

  emit('select', option.value)

  setOptionsUnvisible()
}

const clearSelectedOption = (): void => {
  if (searchString.value === selectedValue.value?.searchValue) {
    return
  }

  selectedValue.value = null
  setValue(null)

  emit('clear')
}

watch(searchString, clearSelectedOption)

const setFeadbackInvalid = (): string => {
  return meta.touched && errorMessage.value ? errorMessage.value : ''
}

const feedbackInvalid = computed(setFeadbackInvalid)

const OptionsDropdown = useTemplateRef('OptionsDropdown')

watch(searchString, ()=>{
  OptionsDropdown.value?.resetCurrentPage()
})

</script>

<style lang="scss" scoped>
  .search-with-prompts__container {
    position: relative;
    width: 100%;
  }
</style>