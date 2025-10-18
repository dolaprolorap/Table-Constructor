<template>
  <form @submit.prevent>
    <BaseFormInput
      id="contestName"
      v-model="newContest.title"
      name="title"
      label="Название конкурса"
      placeholder="Введите название"
      class="mb-3"
    />
    <BaseTextareaInput
      id="contestDescription"
      v-model="newContest.description"
      name="description"
      label="Введите описание конкурса"
      placeholder="Описание конкурса"
      :rows="7"
      :maxlength="500"
      text="До 500 символов"
      class="mb-3"
    />
    <CategoriesMultiSelector
      v-show="!hide"
      id="contestCategories"
      v-model:categories="newContest.categories"
      label="Выберите категории"
      required
      :default-category-labels="getTitleFromContestCategories(newContest)"
      class="mb-3"
      name="categories"
    />
    <BaseDatePicker
      v-show="!hide"
      v-model="newContest.startDate"
      name="started_at"
      label="Дата начала"
      placeholder="Дата начала"
      :required="true"
      :min-date="new Date()"
      :max-date="newContest.endDate"
      class="mb-3"
    />
    <BaseDatePicker
      id="contestEndDate"
      v-model="newContest.endDate"
      name="ended_at"
      label="Дата окончания"
      placeholder="Дата окончания"
      :required="true"
      :min-date="newContest.startDate"
      class="mb-3"
    />
  </form>
</template>
<script setup lang="ts">
import { BaseFormInput, BaseTextareaInput, BaseDatePicker } from '@/shared/ui/components'

import { CategoriesMultiSelector } from '@/entities/achievements/categories/@x/contests'
import { getTitleFromContestCategories, type NewContest } from '@/entities/contests'

interface ContestFormProps {
  hide?: boolean;
}

withDefaults(defineProps<ContestFormProps>(), {
  hide: false
})

const newContest = defineModel<NewContest>({ required : true })

</script>
