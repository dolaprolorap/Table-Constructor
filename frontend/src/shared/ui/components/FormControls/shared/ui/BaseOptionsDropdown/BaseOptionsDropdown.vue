<template>
  <CCard
    v-if="optionsAreVisible"
    ref="OptionsDropdown"
    class="p-2 options-dropdown"
    :class="positionTop && 'top'"
    @focusin="emitFocusin"
  >
    <template v-if="optionsLength > 0">
      <slot name="menu" />

      <div
        v-if="$slots.menu"
        class="options-dropdown__divider"
      />

      <div
        ref="ScrollArea"
        class="options-dropdown__scroll-area"
      >
        <slot name="options" />

        <BaseLoader
          v-if="isLoading"
          size="sm"
        />
      </div>
    </template>

    <template v-else>
      <div class="options-dropdown__loader">
        <DataLoader
          :is-loading="isLoading || false"
          :list-length="optionsLength"
          :empty-message="emptyMessage || 'Опции отсутствуют'"
        />
      </div>
    </template>
  </CCard>
</template>

<script setup lang="ts">
import { onClickOutside, useElementBounding, useInfiniteScroll, useWindowSize } from '@vueuse/core'
import { ref, toRefs, useTemplateRef, watch } from 'vue'

import { BaseLoader, DataLoader } from '../../../..'

interface BaseOptionsDropdownProps {
  optionsLength: number;
  emptyMessage?: string;
  isLoading?: boolean;
  optionsAreVisible: boolean;

  totalPages?: number;
  currentPage?: number;

  loadMore?: () => void;
}

const props = defineProps<BaseOptionsDropdownProps>()

const { totalPages, currentPage, isLoading } = toRefs(props)

interface OptionAreaEmits {
  (event: 'focusin'): void;
  (event: 'click-outside'): void;
}

const emit = defineEmits<OptionAreaEmits>()

const OptionsDropdown = useTemplateRef<HTMLElement>('OptionsDropdown')
const ScrollArea = useTemplateRef<HTMLElement>('ScrollArea')

const emitClickOutside = (): void => {
  emit('click-outside')
}

const emitFocusin = (): void => {
  emit('focusin')
}

onClickOutside(OptionsDropdown, emitClickOutside)

// Position
const MIN_BOTTOM_MARGIN = 40

const { bottom } = useElementBounding(OptionsDropdown)

const windowSizebox = useWindowSize()

const positionTop = ref<boolean>(false)

const setPosition = (): void => {
  if (!bottom.value) {
    positionTop.value = false

    return
  }

  if (positionTop.value) {
    return
  }

  if (windowSizebox.height.value - bottom.value < MIN_BOTTOM_MARGIN) {
    positionTop.value = true
  }
}

watch(bottom, setPosition)

// Infinite scroll

const callLoadMore = (): void => {
  props.loadMore?.()
}

const canLoadMore = (): boolean => {
  if (!totalPages.value || !currentPage.value) {
    return false
  }

  const isLastPage = totalPages.value <= currentPage.value

  return !isLoading.value && !isLastPage
}

useInfiniteScroll(ScrollArea, callLoadMore, { distance: 10, canLoadMore })

</script>

<style scoped lang="scss">
  .options-dropdown {
    position: absolute;
    width: 100%;
    z-index: 100;
    height: fit-content;

    &.top {
      position: absolute;
      bottom: calc(100%);
    }

    .options-dropdown__loader {
      margin-top: 1rem;
    }

    .options-dropdown__divider {
      border-bottom: inherit;
    }

    .options-dropdown__scroll-area {
      display: flex;
      flex-direction: column;

      max-height: 25vh;
      overflow-y: scroll;
      scrollbar-width: none; /* Для Firefox */
    }

    .options-dropdown__scroll-area::-webkit-scrollbar {
      display: none; /* Для WebKit-браузеров (Chrome, Safari, Edge) */
    }
  }
</style>