<template>
  <CContainer
    fluid
    class="page__container"
  >
    <h1 class="mb-3">
      <slot name="page-title"></slot>
    </h1>

    <slot></slot>
  </CContainer>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.page__container {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>