<template>
  <CInputGroup>
    <CInputGroupText>
      <CIcon :icon="iconsSet.searchIcon" />
    </CInputGroupText>

    <CFormInput
      v-model="searchString"
      type="text"
      :placeholder="placeholder"
    />
    <CButton
      v-if="searchString"
      type="button"
      color="secondary"
      variant="outline"
      @click="clearSearch"
    >
      <CIcon
        :icon="iconsSet.xIcon"
      />
    </CButton>
  </CInputGroup>
</template>

<script setup lang="ts">
import { BASE_DEBOUNCE } from '@/shared/config/debounce'

import { useDebouncedModelValue } from './shared'
import { iconsSet } from '../../assets/icons'

interface SearchProps {
  placeholder?: string;
}

defineProps<SearchProps>()

const searchModel = defineModel<string>()

const { inputValue: searchString } = useDebouncedModelValue({ inputModel: searchModel, debounce: BASE_DEBOUNCE })

const clearSearch = (): void => {
  searchString.value = ''
}
</script>