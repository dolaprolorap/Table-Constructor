<template>
  <CTableDataCell
    colspan="7"
    class="p-3"
  >
    <div>
      <h5>
        {{ contest.title }}
      </h5>

      <p class="text-body-secondary">
        <strong>Описание: </strong>{{ contest.description }}
      </p>

      <p class="text-body-secondary">
        <strong>Верифицируемые категории:</strong>
      </p>

      <ul>
        <li
          v-for="(type, index) in contest.categories"
          :key="index"
          class="text-body-secondary"
        >
          {{ type.title }}
        </li>
      </ul>

      <hr class="my-3 border-top border-light">

      <p class="text-body-secondary">
        <CIcon
          :icon="iconsSet.calendarIcon"
          class="me-1"
        />

        <strong class="mr-3">Дата начала: </strong>

        {{ formatDate(contest.startDate) }}
      </p>

      <p class="text-body-secondary">
        <CIcon
          :icon="iconsSet.calendarIcon"
          class="me-1"
        />

        <strong class="mr-3">Дата окончания: </strong>

        {{ formatDate(contest.endDate) }}
      </p>

      <hr class="my-3 border-top border-light">

      <span class="buttons">
        <UpdateContest :contest="contest" />
      </span>

      <DeleteContest
        :contest-id="contest.id"
        :contest="contest"
        :display-icon="false"
      />
    </div>
  </CTableDataCell>
</template>

<script setup lang="ts">
import { formatDate } from '@/shared/lib/date'
import { iconsSet } from '@/shared/ui/assets/icons'

import type { Contest } from '@/entities/contests'

import { DeleteContest } from '@/features/contests/deleteContest'
import { UpdateContest } from '@/features/contests/updateContest'

interface ContestTableAccordionProps {
  contest: Contest;
}

defineProps<ContestTableAccordionProps>()

</script>
<style scoped>
.buttons {
  margin-right: 5px;
}
</style>