<template>
  <BaseSelect
    v-model="selectedContestStatus"
    :name="name"
    :label="label"
    :required="required"
    :all-option="allOption ? 'Все конкурсы' : null"
    :options="options"
  />
</template>

<script setup lang="ts">
import { capitalizeString } from '@/shared/lib/string'
import { BaseSelect, type AllOption } from '@/shared/ui/components'

import { ContestStatusesRu, ContestStatuses } from '@/entities/contests'

const options = [
  { label: capitalizeString(ContestStatusesRu.active), value: ContestStatuses.active }
]

interface SelectRoleProps {
  label?: string;
  id?: string;
  name: string;
  required?: boolean;
  allOption?: boolean;
}

defineProps<SelectRoleProps>()

const selectedContestStatus = defineModel<ContestStatuses | AllOption>('status')

</script>