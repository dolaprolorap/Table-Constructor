<template>
  <BaseOptionsDropdown
    :empty-message="emptyMessage"
    :is-loading="isLoading"
    :options-are-visible="optionsAreVisible"
    :options-length="options.length"

    class="select-dropdown"
    :class="hasLabel ?
      'select-dropdown--select-with-label':
      'select-dropdown--select-without-label'"

    :current-page="currentPage"
    :total-pages="totalPages"

    :load-more="callLoadMore"

    @click-outside="emitClickOutside"
    @focusin="emitFocusin"
  >
    <template #options>
      <CButton
        v-for="option in options"
        :key="option.label"
        class="select-dropdown__option"
        @click="()=>{
          emitSelectOption(option)
        }"
      >
        {{ option.label }}

        <div
          v-if="option.labelPrompt"
          class="select-dropdown__option__prompt"
        >
          {{ option.labelPrompt }}
        </div>
      </CButton>
    </template>
  </BaseOptionsDropdown>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'

import BaseOptionsDropdown from './BaseOptionsDropdown/BaseOptionsDropdown.vue'
import type { SelectOption } from '../model/types'

/*
  ПРОБЛЕМА: опции должны располагаться прямо под инпутом селекта,
  но это ломается когда мы отображаем ошибки

  Я не смог придумать способа это обойти лучше чем простой хардкод.

  В зависимости от того, есть ли у селекта лэйбел я установливаю позицию дропдауна
  абсолютно относительно контейнра селекта.
  (так как лэйбел увеличивает размер контейнера и смешает инпут вниз).

  Возможно есть еще какие то моменты которые я не учел.
*/

interface SelectOptionsDropdownProps {
  options: SelectOption[];
  emptyMessage?: string;
  isLoading?: boolean;
  optionsAreVisible: boolean;

  totalPages?: number;

  hasLabel: boolean;

  loadMore?: (currentPage: number) => void;
}

const props = defineProps<SelectOptionsDropdownProps>()

const { totalPages } = toRefs(props)

interface SelectOptionsDropdownEmits {
  (event: 'focusin'): void;
  (event: 'select-option', option: SelectOption): void;
  (event: 'click-outside'): void;
}

const emit = defineEmits<SelectOptionsDropdownEmits>()

const currentPage = ref<number>(1)

const emitFocusin = (): void => {
  emit('focusin')
}

const emitSelectOption = (option: SelectOption): void => {
  emit('select-option', option)
}

const emitClickOutside = (): void => {
  emit('click-outside')
}

// Управление пагинацией

const callLoadMore = (): void => {
  currentPage.value += 1

  props.loadMore?.(currentPage.value)
}

const resetCurrentPage = (): void => {
  currentPage.value = 1
}

interface SelectOptionsDropdownExpose {
  resetCurrentPage: () => void;
}

defineExpose<SelectOptionsDropdownExpose>({
  resetCurrentPage
})

</script>

<style lang="scss" scoped>
.select-dropdown {
  .select-dropdown__option {
    border: none;
    margin-bottom: 0.1rem;

    display: flex;
    flex-direction: row;
    align-items: end;
    gap: 0.5rem;

    .select-dropdown__option__prompt {
      opacity: 70%;
    }
  }

  .select-dropdown__option:active {
    border: none;
  }

  .select-dropdown__option:hover {
    background-color: var(--cui-secondary-bg);
  }
}

.select-dropdown.select-dropdown--select-with-label {
  top: 69.33px
}

.select-dropdown.select-dropdown--select-without-label {
  top: 37.33px
}
</style>
