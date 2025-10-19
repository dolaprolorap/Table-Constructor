<template>
  <TableObjectWithAccordion>
    <template #default>
      <CTableDataCell
        v-for="(cell, idx) of row.data"
        :key="idx"
      >
        {{ cell }}
      </CTableDataCell>
    </template>
  </TableObjectWithAccordion>
</template>

<script setup lang="ts">
import { TableObjectWithAccordion } from '@/shared/ui/components'

import type { TableRow } from '@/entities/tables/rows'

interface TableItemProps {
	row: TableRow;
}

defineProps<TableItemProps>()

</script>