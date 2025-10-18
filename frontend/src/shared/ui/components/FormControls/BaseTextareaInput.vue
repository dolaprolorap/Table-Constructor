<template>
  <div>
    <CFormTextarea
      :id="id"
      v-model="modelValue"
      :name="name"
      :class="customClass"
      :label="label"
      :placeholder="placeholder"
      :feedback-invalid="showFeedback ? feedbackInvalid: ''"
      :invalid="invalid || !!feedbackInvalid"
      :rows="rows"
      :text="text"
      :maxlength="maxlength"
      :required="required"
      @blur="handleBlur"
    />
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed, toRefs, watch } from 'vue'

interface Props {
  id?: string;
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number | null;
  customClass?: string;
  text?: string;
  maxlength?: number | null;
  invalid?: boolean;
  showFeedback?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  label: '',
  placeholder: '',
  rows: null,
  customClass: '',
  text: '',
  maxlength: null,
  showFeedback: true
})

const { name } = toRefs(props)

const modelValue = defineModel<string>({ default: '' })

const {
  value, errorMessage, meta,
  handleBlur
} = useField<string>(name.value)

watch(modelValue, (val) => {
  value.value = val.trim()
}, { immediate : true })

const setFeadbackInvalid = (): string => {
  return meta.touched && errorMessage.value ? errorMessage.value : ''
}

const feedbackInvalid = computed(setFeadbackInvalid)

</script>

<style scoped>
input {
  max-height: 100px;
  width: auto;
}
</style>
