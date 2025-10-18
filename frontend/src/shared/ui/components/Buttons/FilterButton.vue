<template>
  <CButton
    color="secondary"
    @click="toggleFilter"
  >
    <CIcon
      :icon="filterIsActive ? iconsSet.filterXIcon: iconsSet.filterIcon"
      size="lg"
    />
  </CButton>
</template>

<script setup lang="ts">
import { iconsSet } from '../../assets/icons'

const filterIsActive = defineModel<boolean>()

const toggleFilter = (): void => {
  filterIsActive.value = !filterIsActive.value
}
</script>