<template>
  <BaseSearchWithPrompt
    :id="id"
    v-model:search-string="title"
    :options="options"
    :is-loading="isLoading"
    empty-message="Конкурсов не найдено"
    :placeholder="placeholder"
    :label="label"
    :name="name"
    :name-search="`${name}-title`"
    :custom-class="customClass"
    :required="required"

    :last-page="paginationMeta?.lastPage || 1"

    :load-more="fetchMoreOption"

    @select="selectContest"
    @clear="clearContest"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import { BaseSearchWithPrompt, FormControlsSharedConfig, type SearchWithPromptOption } from '@/shared/ui/components'

import { useGetAllContests } from '../api'
import type { Contest } from '../model/types/contestType'

interface ContestSearchProps {
  id: string;
  placeholder?: string;
  label?: string;
  name: string;
  customClass?: string;
  required?: boolean;
}

defineProps<ContestSearchProps>()

const selectedContest = defineModel<Contest | null>('contest')

const { getAllContests, contests, isLoading, paginationMeta } = useGetAllContests()

const title = ref<string>('')

const selectContest = (value: string): void => {
  const contestId = Number(value)

  const foundContest = contests.value.find((contest)=>{
    return contest.id === contestId
  })

  if (!foundContest) {
    return
  }

  selectedContest.value = foundContest
}

const clearContest = (): void => {
  selectedContest.value = null
}

const options = ref<SearchWithPromptOption[]>([])
const currentPage = ref<number>(1)

const fetchOptions = (): void => {
  currentPage.value = 1

  if (!title.value) {
    options.value = []

    return
  }

  getAllContests({
    title: title.value,
    pageSize: FormControlsSharedConfig.DEFAULT_ITEMS_PER_PAGE
  })
}

watch(title, fetchOptions)

const fetchMoreOption = (page: number): void => {
  currentPage.value = page

  getAllContests({
    title: title.value,
    pageSize: FormControlsSharedConfig.DEFAULT_ITEMS_PER_PAGE,
    page
  })
}

const saveOptions = (): void => {
  if (currentPage.value === 1) {
    options.value = []
  }

  for (const contest of contests.value) {
    const contestOption: SearchWithPromptOption = {
      label: contest.title,
      value: contest.id.toString(),
      searchValue: contest.title
    }

    options.value.push(contestOption)
  }
}

watch(contests, saveOptions)

</script>