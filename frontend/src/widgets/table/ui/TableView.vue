<template>
  <div>
    <TableToolbar />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import TableToolbar from './TableToolbar.vue'

const searchString = ref<string>('')
</script>