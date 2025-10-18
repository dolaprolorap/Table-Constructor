<template>
  <div class="dp__container">
    <label
      v-if="label"
      :id="label"
      class="mb-2"
    >
      {{ label }}
    </label>

    <div :class="{ 'has-error': meta.touched && errorMessage }">
      <VueDatePicker
        v-model="dateValue"
        :dark="isDarkMode"
        format="dd.MM.yyyy"
        locale="ru"
        type="date"
        :placeholder="placeholder"
        :enable-time-picker="false"
        class="dp__custom"
        :auto-apply="true"
        :hide-navigation-buttons="true"
        :min-date="actualMinDate"
        :max-date="maxDate ?? undefined"
        preview-format=""
        :class="{ 'is-invalid': !!errorMessage }"
        @blur="handleBlur"
      />

      <div
        v-if="meta.touched && errorMessage"
        class="mt-2 error-message"
      >
        {{ meta.touched ? errorMessage : '' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useColorModes } from '@coreui/vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import { useField } from 'vee-validate'
import { watch, computed } from 'vue'

import '@vuepic/vue-datepicker/dist/main.css'

const { colorMode } = useColorModes('coreui-free-vue-admin-template-theme')

interface DatePickerProps {
  label: string;
  placeholder: string;
  minDate?: Date | null;
  maxDate?: Date | null;
  defaultValue?: string;
  required?: boolean;
  message?: string;
  name?: string;
}

const props = withDefaults(defineProps<DatePickerProps>(), {
  required: false,
  message: 'Поле с датой не может быть пустым',
  name: 'dateField',
  defaultValue: String(new Date()),
  minDate: null,
  maxDate: null
})

const dateValue = defineModel<Date | null>({ default: null })

const {
  value, errorMessage, meta,
  handleBlur
} = useField<Date | null>(props.name)

watch(dateValue, (val) => {
  if (val && errorMessage.value) {
    meta.touched = false
  }
})

watch(dateValue, () => {
  value.value = dateValue.value
}, { immediate : true })

const today = new Date()

const actualMinDate = computed(() => {
  if (!props.minDate) {return today}

  return props.minDate < today ? today : props.minDate
})

const isDarkMode = computed(() => {
  return colorMode.value === 'dark'
})

const errorColor = computed(() => {
  return isDarkMode.value ? '#ea868f' : '#e55353'
})

const boxShadowColor = computed(() => {
  const hasError = errorMessage.value && meta.touched

  if (hasError) {
    return isDarkMode.value ? 'rgba(234, 134, 143, 0.25)' : 'rgba(229, 83, 83, 0.25)'
  }

  return isDarkMode.value ? 'rgba(163, 161, 235, 0.25)' : 'rgba(213, 213, 245, 1)'
})
</script>

<style lang="scss">
.dp__container {
  .dp__menu.dp__theme_dark {
      background-color: #212631 !important;
      border: 2px solid #323A49;
  }

  .dp__calendar {
      background-color: transparent !important;
  }

  .dp__cell_inner {

      &:hover {
        border: none;
      }
  }

  .dp__theme_dark {
    --dp-border-color: #383C46 !important;
    --dp-hover-border-color: #383C46 !important;
    --dp-background-color: #212631;
    --dp-text-color: #fff !important;
    --dp-hover-color: #212631;
    --dp-hover-text-color: #fff;
    --dp-hover-icon-color: #b69eff;
    --dp-primary-color: #6261CC;
    --dp-highlight-color: rgba(155, 89, 255, 0.2);
    --dp-menu-border-color: #383C46;
    --dp-border-color-hover: rgb(163, 161, 235);
    --dp-border-color-focus: rgb(163, 161, 235);
    --dp-range-between-dates-background-color: rgba(155, 89, 255, 0.2);
    --dp-range-between-dates-text-color: #fff;
    --dp-range-between-border-color: #9b59ff;
    --dp-scroll-bar-background: #212631;
    --dp-scroll-bar-color: #484848;
    --dp-tooltip-color: #212631;
    --error-color: #ea868f;
    --error-border-color: #ea868f;
  }

  .dp__theme_light {
      --dp-background-color: #fff;
      --dp-text-color: #212121;
      --dp-hover-color: #f3f3f3;
      --dp-hover-text-color: #212121;
      --dp-hover-icon-color: #959595;
      --dp-primary-color: #5856d6;
      --dp-primary-color: #5856d6;
      --dp-primary-text-color: #f8f5f5;
      --dp-secondary-color: #c0c4cc;
      --dp-border-color: #ddd;
      --dp-menu-border-color: #ddd;
      --dp-border-color-hover: rgb(223, 223, 223);
      --dp-border-color-focus: rgb(171.5, 170.5, 234.5);
      --dp-disabled-color: #f6f6f6;
      --error-color: #e55353;
      --error-border-color: #e55353;
      --error-focus-shadow: v-bind(boxShadowColor);

      &:focus-within .dp__input {
        box-shadow: 0 0 0 4px var(--error-focus-shadow);
      }
  }

  .error-message {
    color: v-bind(errorColor) !important;
    font-size: 14px;
  }

  .has-error .dp__input {
      border: 1px solid var(--error-border-color) !important;
      border-radius: 0.375rem;
  }
}
</style>
