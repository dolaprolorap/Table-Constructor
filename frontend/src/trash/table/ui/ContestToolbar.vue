<template>
  <div>
    <BaseSearchInput
      v-model="searchedTitle"
      aria-label="Contest name"
      placeholder="Название конкурса"
      class="mb-3"
    />
    <div class="d-flex justify-content-between gap-2">
      <ContestStatusSelector
        v-model:status="contestStatusInner"
        name="contest-status"
        all-option
      />
      <AddContest />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'

import { BaseSearchInput, DefaultSelectOptions, type AllOption } from '@/shared/ui/components'

import { type ContestStatuses } from '@/entities/contests'

import { AddContest } from '@/features/contests/addContest'
import { ContestStatusSelector } from '@/features/contests/filterContest'

const contestStatusModel = defineModel<ContestStatuses | null>('status', { default: null })
const searchedTitle = defineModel<string>('searchTitle')

const contestStatusInner = ref<ContestStatuses | AllOption>(DefaultSelectOptions.all)

const updateContestStatusModel = (): void => {
  if (contestStatusInner.value === DefaultSelectOptions.all) {
    contestStatusModel.value = null

    return
  }

  contestStatusModel.value = contestStatusInner.value
}

const updateContestStatusInner = (): void => {
  if (!contestStatusModel.value) {
    contestStatusInner.value = DefaultSelectOptions.all

    return
  }

  contestStatusInner.value = contestStatusModel.value
}

watch(contestStatusModel, updateContestStatusInner, { immediate: true })
watch(contestStatusInner, updateContestStatusModel)

</script>