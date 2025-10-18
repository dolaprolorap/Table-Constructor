<template>
  <CContainer
    class="loader__container"
  >
    <CSpinner :size="size" />
  </CContainer>
</template>

<script setup lang="ts">

interface BaseSpinnerProps {
  size?: string;
}

defineProps<BaseSpinnerProps>()

</script>

<style scoped>
.loader__container{
    width: 100%;

    display: flex;
    justify-content: center;

    margin-bottom: 1rem;
}
</style>