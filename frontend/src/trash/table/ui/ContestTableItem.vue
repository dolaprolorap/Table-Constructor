<template>
  <TableObjectWithAccordion>
    <template #default>
      <CTableDataCell class="w-30">
        <TruncateTextWrapper>
          {{ contest.title }}
        </TruncateTextWrapper>
      </CTableDataCell>

      <CTableDataCell>
        {{ contest ? (contest.categories[0].title) : "Категории не назначены" }}
        <CBadge
          v-if="contest.categories.length > 1"
          color="secondary"
        >
          + {{ contest.categories.length - 1 }}
        </CBadge>
      </CTableDataCell>

      <CTableDataCell>{{ formatDate(contest.startDate) }}</CTableDataCell>

      <CTableDataCell>{{ formatDate(contest.endDate) }}</CTableDataCell>

      <CTableDataCell>
        <CBadge
          :color="ContestStatusesColors[contest.status]"
        >
          {{ capitalizeString(ContestStatusesRu[contest.status]) }}
        </CBadge>
      </CTableDataCell>

      <CTableDataCell @click.stop>
        <UpdateContest
          :contest="contest"
          :display-icon="true"
        />
      </CTableDataCell>

      <CTableDataCell
        @click.stop
      >
        <DeleteContest
          :contest-id="contest.id"
          :contest="contest"
          :display-icon="true"
        />
      </CTableDataCell>
    </template>

    <template #accordion>
      <ContestTableAccordion :contest="contest" />
    </template>
  </TableObjectWithAccordion>
</template>

<script setup lang="ts">
import { formatDate } from '@/shared/lib/date'
import { capitalizeString } from '@/shared/lib/string'
import { TableObjectWithAccordion, TruncateTextWrapper } from '@/shared/ui/components'

import { ContestStatusesColors, ContestStatusesRu, type Contest } from '@/entities/contests'

import { DeleteContest } from '@/features/contests/deleteContest'
import { UpdateContest } from '@/features/contests/updateContest'

import ContestTableAccordion from './ContestTableAccordion.vue'

interface ContestTableItemProps {
  contest: Contest;
}

defineProps<ContestTableItemProps>()

</script>