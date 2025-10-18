<template>
  <CTableRow
    class="accordion-table-row row-with-accordion"
    @click="toggleActive"
  >
    <slot />
  </CTableRow>
  <CTableRow
    v-show="isActive"
    class="accordion-table-row"
  >
    <slot name="accordion" />
  </CTableRow>
</template>

<script setup lang="ts">
const isActive = defineModel<boolean>({ default: false })

const toggleActive = (): void => {
  isActive.value = !isActive.value
}

</script>

<style scoped>
.row-with-accordion{
  height: 52.67px;
  width: 100%;
}

.row-with-accordion:hover{
  cursor: pointer;
}
</style>