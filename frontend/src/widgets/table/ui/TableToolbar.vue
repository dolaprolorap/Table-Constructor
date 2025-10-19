<template>
  <div>
    <!-- <BaseSearchInput placeholder="Поиск по таблицам" v-model="searchString"/> -->
    <CButton color="primary">
      Ввести данные
    </CButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { BaseSearchInput } from '@/shared/ui/components'

const searchString = ref<string>('')
</script>