<template>
  <BaseSelect
    :id="id"
    v-model="selectedRole"
    :name="name"
    :label="label"
    :required="required"
    :show-feedback="showFeedback"
    :options="[
      'Выберите тип',
      { label: capitalizeString(ColumnTypesRu.string), value: ColumnTypes.string },
      { label: capitalizeString(ColumnTypesRu.number), value: ColumnTypes.number },
      { label: capitalizeString(ColumnTypesRu.timestamp), value: ColumnTypes.timestamp },
      { label: capitalizeString(ColumnTypesRu.enum), value: ColumnTypes.enum }
    ]"
  />
</template>

<script setup lang="ts">
import { capitalizeString } from '@/shared/lib/string'
import { BaseSelect } from '@/shared/ui/components'

import { ColumnTypesRu } from '..'
import { ColumnTypes } from '../model/ColumnTypes'

interface SelectTypeProps {
	label?: string;
	id?: string;
	name: string;
	required?: boolean;
	showFeedback?: boolean;
}

defineProps<SelectTypeProps>()

const selectedRole = defineModel<ColumnTypes>()
</script>