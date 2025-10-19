<template>
  <PageContainer>
    <template #page-title>
      Просмотр таблицы №{{ tableId }}
    </template>

    <div class="content">
      <p>Идентификатор таблицы: <strong>{{ tableId }}</strong></p>

      <TableView
        v-if="table"
        :table="table"
      />

      <FullPageLoader v-else />
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { FullPageLoader, PageContainer } from '@/shared/ui/components'

import { useGetTableById } from '@/entities/tables/tables'

import { TableView } from '@/widgets/table'

const props = defineProps<{
	tableId: string
}>()

const { getTableById, table } = useGetTableById()

onMounted(async () => {
	await getTableById({
		id: Number(props.tableId)
	})
})
</script>

<style scoped>
.content {
  margin-top: 20px;
}
</style>
