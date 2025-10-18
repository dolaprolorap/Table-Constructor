<template>
  <div class="select-with-infinite-scroll__container">
    <label
      v-if="label"
      class="form-label"
    >
      {{ label }}
    </label>

    <div
      :id="id"
      class="form-select"
      :class="componentClasses"
      tabindex="0"
      @click="setOptionsVisible"
    >
      <span>{{ selectedLabel || placeholder }}</span>
    </div>

    <SelectOptionsDropdown
      ref="OptionsDropdown"
      :options="[
        ...defaultOptions,
        ...options
      ]"
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
      v-if="showFeedback && feedbackInvalid"
      :error-message="feedbackInvalid"
    />
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed, toRefs, watch, ref } from 'vue'

import { DefaultSelectOptions, FieldErrorMessage, SelectOptionsDropdown, useOptionsVisibilityHandlers, type AllOption, type NoneOption, type SelectOption } from './shared'

interface SelectWithInfiniteScrollProps {
  // Внешний вид
  options: SelectOption[];

  customClass?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  showFeedback?: boolean;

  // Индефикаторы
  id: string;
  name?: string;

  allOption?: string | null;
  noneOption?: string | null;

  // Работа с асинхронной загрузкой опций
  isLoading?: boolean;
  emptyMessage?: string;
  lastPage?: number;

  loadMore?: () => void;
}

const props = defineProps<SelectWithInfiniteScrollProps>()

const { id, name, options, customClass, disabled, allOption, noneOption } = toRefs(props)

const {
  errorMessage, setValue, meta, value: selectedValue
} = useField<string | AllOption | NoneOption | null>(()=>{
  return name?.value || id.value
})

const { optionsAreVisible, setOptionsUnvisible, setOptionsVisible } = useOptionsVisibilityHandlers({ selectInputId: id.value, disabled })

const selectOption = (option: SelectOption): void => {
  setValue(option.value)

  setOptionsUnvisible()
}

const defaultOptions = ref<SelectOption[]>([])

const setDefaultOptions = (): void => {
  defaultOptions.value = []

  if (allOption.value) {
    const allSelectOption: SelectOption = {
      value: DefaultSelectOptions.all,
      label: allOption.value
    }

    defaultOptions.value.push(allSelectOption)
  }

  if (noneOption.value) {
    const noneSelectOption: SelectOption = {
      value: DefaultSelectOptions.none,
      label: noneOption.value
    }

    defaultOptions.value.push(noneSelectOption)
  }
}

watch([allOption, noneOption], setDefaultOptions, { deep: true, immediate: true })

const selectedLabel = computed(()=>{
  const selectedOption = options.value.find((option)=>{
    return option.value === selectedValue.value
  })

  if (selectedOption) {
    return selectedOption.label
  }

  const selectedDefaultOption = defaultOptions.value.find((option)=>{
    return option.value === selectedValue.value
  })

  return selectedDefaultOption?.label
})

const setFeedbackInvalid = (): string => {
  return meta.touched && errorMessage.value ? errorMessage.value : ''
}

const feedbackInvalid = computed(setFeedbackInvalid)

// Синхронизация модели со значением
const modelValue = defineModel<string | AllOption | NoneOption>({ default: '' })

const syncModelValueWithInnerValue = (): void => {
  modelValue.value = selectedValue.value || ''
}

watch(selectedValue, syncModelValueWithInnerValue )

const syncInnerValueWithModelValue = (): void => {
  selectedValue.value = modelValue.value
}

watch(modelValue, syncInnerValueWithModelValue, { immediate: true })

const componentClasses = computed<string>(()=>{
  let classes = ''

  if (customClass.value) {
    classes += customClass.value
  }

  if (feedbackInvalid.value) {
    classes += ' is-invalid'
  }

  if (disabled.value) {
    classes += ' disabled'
  }

  return classes
})

</script>

<style scoped lang="scss">
  .select-with-infinite-scroll__container {
    position: relative;
    width: 100%;
  }
</style>