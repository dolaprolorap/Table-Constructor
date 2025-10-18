<template>
  <div class="w-100">
    <CFormSelect
      :id="id"
      v-model="selectValue"
      :label="label"
      :feedback-invalid="showFeedback ? feedbackInvalid : ''"
      :required="required"
      :invalid="invalid || !!feedbackInvalid"
      :options="[
        ...defaultOptions,
        ...options
      ]"
    />
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed, ref, toRefs, watch } from 'vue'

import { DefaultSelectOptions, type AllOption, type NoneOption, type SelectOption } from './shared'

interface SelectCategoryProps {
  id?: string;
  name: string;
  label?: string;
  required?: boolean;
  invalid?: boolean;
  showFeedback?: boolean;

  options: SelectOption[];
  allOption?: string | null;
  noneOption?: string | null;
}

const props = withDefaults(defineProps<SelectCategoryProps>(), {
  id: '',
  label: '',
  showFeedback: true,
  allOption: null,
  noneOption: null
})

const { name, allOption, noneOption } = toRefs(props)

const selectValue = defineModel<string | AllOption | NoneOption | null>({ default: null })

const {
  value, errorMessage, meta
} = useField<string | null>(name.value)

watch(selectValue, (val) => {
  value.value = val
}, { immediate : true })

const setFeadbackInvalid = (): string => {
  return meta.touched && errorMessage.value ? errorMessage.value : ''
}

const feedbackInvalid = computed(setFeadbackInvalid)

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

</script>