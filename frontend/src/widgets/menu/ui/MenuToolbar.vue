<template>
  <div class="contest-search-toolbar">
    <BaseSearchInput
      v-model="searchTitleModel"
      aria-label="Table name"
      placeholder="Название таблицы"
      class="mb-2"
    />
  </div>
</template>

<script setup lang="ts">
import { BaseSearchInput } from '@/shared/ui/components'

const searchTitleModel = defineModel<string>('searchTitle', { default: '' })
</script>

<style scoped>
.contest-search-toolbar {
    width: 100%;
}
</style>
