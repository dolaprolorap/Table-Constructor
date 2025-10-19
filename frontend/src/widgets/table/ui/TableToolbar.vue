<template>
  <div class="d-flex gap-2 mb-2">
    <BaseFormInput
      name=""
      placeholder="Название таблицы"
    />

    <addRow :table="table" />
  </div>
</template>

<script setup lang="ts">
import { BaseFormInput } from '@/shared/ui/components'

import type { TableWithColumns } from '@/entities/tables/tables/model/types/tablesType'

import { addRow } from '@/features/tables/rows'

interface TableToolbarProps {
	table: TableWithColumns
}

defineProps<TableToolbarProps>()

</script>