<template>
  <BaseOptionsDropdown
    :empty-message="emptyMessage"
    :is-loading="isLoading"
    :options-are-visible="optionsAreVisible"
    :options-length="options.length"
    class="multi-options-dropdown"

    @click-outside="emitClickOutside"
    @focusin="emitFocusin"
  >
    <template #menu>
      <CButton
        class="dropdown-option rounded-0 p-2"
        @click="emitToggleAllOptions"
      >
        Выбрать все
      </CButton>
    </template>
    <template #options>
      <CButton
        v-for="option in options"
        :key="option.label"
        class="dropdown-option"
        :class="checkOption(option) && 'selected'"
        @click="()=>{
          emitToggleOption(option)
        }"
      >
        <CFormCheck
          v-model="selectedOptions"
          :label="option.label"
          :value="option.value"
          @click.stop
        />
      </CButton>
    </template>
  </BaseOptionsDropdown>
</template>

<script setup lang="ts">
import { BaseOptionsDropdown, type SelectOption } from '../../shared'

interface OptionsDropdownProps {
  options: SelectOption[];
  emptyMessage?: string;
  isLoading?: boolean;
  optionsAreVisible: boolean;

  checkOption: (option: SelectOption) => boolean;
}

interface OptionsAreaEmits {
  (event: 'focusin'): void;
  (event: 'toggle-all-options'): void;
  (event: 'toggle-option', option: SelectOption): void;
  (event: 'click-outside'): void;
}

const emit = defineEmits<OptionsAreaEmits>()

defineProps<OptionsDropdownProps>()

const selectedOptions = defineModel<string[]>('selectedOptions', { required: true })

const emitFocusin = (): void => {
  emit('focusin')
}

const emitToggleAllOptions = (): void => {
  emit('toggle-all-options')
}

const emitToggleOption = (option: SelectOption): void => {
  emit('toggle-option', option)
}

const emitClickOutside = (): void => {
  emit('click-outside')
}
</script>

<style scoped lang="scss">
  .multi-options-dropdown {
    .dropdown-option {
      text-align: start;
      border: none;
      margin-bottom: 0.1rem;

      &.selected {
      background-color: var(--cui-secondary-bg);

        &:hover {
          background-color: var(--cui-secondary-bg);
        }
      }
    }
  }
</style>