<template>
  <PageContainer>
    <template #page-title>
      Просмотр таблицы №{{ tableId }}
    </template>

    <div class="content">
      <p>Идентификатор таблицы: <strong>{{ tableId }}</strong></p>

      <pre v-if="tableData">{{ tableData }}</pre>
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PageContainer } from '@/shared/ui/components'

const props = defineProps<{
  tableId: string
}>()

const tableData = ref<any>(null)

onMounted(async () => {
  const response = await fetch(`/api/tables/${props.tableId}`)
  tableData.value = await response.json()
})
</script>

<style scoped>
.content {
  margin-top: 20px;
}
</style>
