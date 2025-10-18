<template>
  <BaseLoader v-if="isLoading && listIsEmpty" />

  <div
    v-if="!isLoading && listIsEmpty"
    class="d-flex justify-content-center w-100 mb-3"
  >
    {{ emptyMessage }}
  </div>
</template>

<script setup lang="ts">
import { watch, ref, toRefs } from 'vue'

import BaseLoader from './BaseLoader.vue'

interface DataLoaderProps {
  isLoading: boolean;
  emptyMessage: string;
  listLength: number;
}

const props = defineProps<DataLoaderProps>()

const { listLength } = toRefs(props)

const listIsEmpty = ref<boolean>()

const setListIsEmpty = (): void => {
  listIsEmpty.value = listLength.value === 0
}

watch(listLength, setListIsEmpty, { immediate: true })

</script>