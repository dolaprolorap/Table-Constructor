<template>
  <div class="actions">
    <CreateTable />

    <ImportTable />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { CreateTable, ImportTable } from '@/features/tables/table'

</script>

<style scoped>
.actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.import-btn {
  display: flex;
  align-items: center;
  gap: 6px;
}
</style>
