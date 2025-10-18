<template>
  <div class="multi-select__container">
    <MultiSelectInput
      :id="id"
      :placeholder="placeholder"
      :label="label"
      :is-invalid="!!feedbackInvalid"
      :selected-options="selectedOptions"

      :get-label-by-value="getLabelByValue"

      @clear-selected="clearSelected"
      @focusin="setOptionsVisible"
      @unselect-option="unselectOption"
    />

    <MultiSelectOptionsDropdown
      v-model:selected-options="selectedOptions"
      :options="options"
      :empty-message="emptyMessage"
      :is-loading="isLoading"
      :options-are-visible="optionsAreVisible"

      :check-option="checkOption"

      @focusin="setInputFocused"
      @click-outside="setOptionsUnvisible"
      @toggle-all-options="toggleAllOptions"
      @toggle-option="toggleOption"
    />

    <FieldErrorMessage
      v-if="feedbackInvalid"
      :error-message="feedbackInvalid"
    />
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { watch, computed, toRefs } from 'vue'

import MultiSelectInput from './MultiSelectInput.vue'
import MultiSelectOptionsDropdown from './MultiSelectOptionsDropdown.vue'
import { FieldErrorMessage, useOptionsVisibilityHandlers, type SelectOption } from '../../shared'
import { useOptionHandlers } from '../model/useOptionHandlers'

interface MultiSelectProps {
  /**
   * Опции мульти селекта. Поле labelPrompt пока игнорируется
   */
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  id: string;
  name: string;
  isLoading?: boolean;
  required?: boolean;
  emptyMessage?: string;
}

const props = defineProps<MultiSelectProps>()

const { options, id, name } = toRefs(props)

// Регулирование выбора опций

const selectedOptions = defineModel<string[]>({ default: [] })

const { toggleAllOptions, toggleOption, unselectOption, clearSelected, checkOption, getLabelByValue }
 = useOptionHandlers({ options, selectedOptions })

// Регулирование видимости OptionsDropdown

const { optionsAreVisible, setOptionsVisible, setOptionsUnvisible, setInputFocused } = useOptionsVisibilityHandlers({ selectInputId: `multi-select__input-${id.value}` })

// Валидация
const {
  value, errorMessage, meta
} = useField<string[]>(name.value, {})

watch(selectedOptions, (val) => {
  value.value = val
}, { deep : true, immediate: true })

const setFeadbackInvalid = (): string => {
  return meta.touched && errorMessage.value ? errorMessage.value : ''
}

const feedbackInvalid = computed(setFeadbackInvalid)

</script>

<style scoped lang="scss">
  .multi-select__container {
    position: relative;
    width: 100%;
  }
</style>