<template>
  <div class="w-100">
    <CFormInput
      :id="id"
      v-model="modelValue"
      :name="name"
      :class="customClass"
      :type="type"
      :label="label"
      :placeholder="placeholder"
      :feedback-invalid="showFeedback ? feedbackInvalid : ''"
      :invalid="invalid || !!feedbackInvalid"
      :required="required"
      :autocomplete="autocomplete || 'off'"
      @blur="handleBlur"
    />
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { toRefs, watch, computed } from 'vue'

interface Props {
	id?: string;
	name: string;
	label?: string;
	placeholder?: string;
	required?: boolean;
	customClass?: string;
	invalid?: boolean;
	showFeedback?: boolean;
	autocomplete?: boolean;
	type?: 'text' | 'password'
}

const props = withDefaults(defineProps<Props>(), {
	id: '',
	label: '',
	type: 'text',
	placeholder: '',
	customClass: '',
	showFeedback: true,
	autocomplete: true
})

const modelValue = defineModel<string>({ default: '' })

const { name } = toRefs(props)

const {
	value, errorMessage, meta,
	handleBlur
} = useField<string>(name.value)

watch(modelValue, val => {
	value.value = val
}, { immediate : true })

const setFeadbackInvalid = (): string => {
	return meta.touched && errorMessage.value ? errorMessage.value : ''
}

const feedbackInvalid = computed(setFeadbackInvalid)

</script>
