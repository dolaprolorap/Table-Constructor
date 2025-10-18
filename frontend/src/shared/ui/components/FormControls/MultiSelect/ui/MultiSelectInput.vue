<template>
  <label
    v-if="label"
    class="form-label"
  >
    {{ label }}
  </label>

  <CCard
    :id="`multi-select__input-${id}`"
    tabindex="0"
    class="multi-select-input"
    :class="isInvalid && 'is-invalid'"
    @focusin="emitFocusin"
  >
    <div
      v-if="!selectedOptions.length"
      class="multi-select-input__placeholder"
    >
      {{ placeholder }}
    </div>

    <template v-else>
      <div class="multi-select-input__option-card__container">
        <CCard
          v-for="selectedValue in selectedOptions"
          :key="selectedValue"
          class="multi-select-input__option-card"
        >
          {{ capitalizeString(getLabelByValue(selectedValue)) }}
          <CButton
            class="multi-select-input__button"
            @click="()=>{
              emitUnselectOption(selectedValue)
            }"
          >
            <CIcon
              :icon="iconsSet.xIcon"
            />
          </CButton>
        </CCard>
      </div>

      <div class="multi-select-input__buttons-container">
        <CButton
          class="multi-select-input__button"
          @click="emitClearSelected"
        >
          <CIcon
            :icon="iconsSet.xIcon"
          />
        </CButton>
      </div>
    </template>
  </CCard>
</template>

<script setup lang="ts">
import { capitalizeString } from '@/shared/lib/string'
import { iconsSet } from '@/shared/ui/assets/icons'

interface SelectInputsProps {
  placeholder?: string;
  label?: string;
  id: string;
  isInvalid: boolean;
  selectedOptions: string[];

  getLabelByValue: (value: string) => string;
}

defineProps<SelectInputsProps>()

interface SelectInputsEmit {
  (event: 'focusin'): void;
  (event: 'unselect-option', value: string): void;
  (event: 'clear-selected'): void;
}

const emit = defineEmits<SelectInputsEmit>()

const emitFocusin = (): void => {
  emit('focusin')
}

const emitUnselectOption = (value: string): void => {
  emit('unselect-option', value)
}

const emitClearSelected = (): void => {
  emit('clear-selected')
}

</script>

<style scoped lang="scss">
  .multi-select-input {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    padding: 0.25rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    min-height: 37.34px;
    height: fit-content;

    transition:
      border-color 0.5s,
      box-shadow 0.5s;

    &.is-invalid {

      border-color: var(--cui-form-invalid-border-color);

      &:focus {
        border-color: var(--cui-form-invalid-border-color);
        box-shadow: 0 0 0 0.25rem rgba(var(--cui-danger-rgb), 0.25);
      }
    }

    &:focus {
      border-color: rgb(171.5, 170.5, 234.5);
      box-shadow: 0 0 0 0.25rem rgba(88, 86, 214, 0.25);
      outline: 0;
    }

    .multi-select-input__placeholder {
      color: var(--cui-secondary-color);
      background: none;
    }

    .multi-select-input__option-card__container {
      width: 95%;

      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;

      gap: 4px;

      .multi-select-input__option-card {
        width: fit-content;

        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 16px;

        padding-left: 8px;
        padding-right: 8px;
        padding-top: 1px;
        padding-bottom: 1px;

        background-color: var(--cui-secondary-bg);
      }
    }

    .multi-select-input__button {
      padding: 0;
      border: none;
    }

    .multi-select-input__buttons-container {
      width: fit-content;
      display: flex;
      justify-content: flex-end;
      padding-left: 0.2rem;
    }
  }
</style>