<template>
  <div class="full-page-container">
    <slot></slot>
  </div>
</template>

<style scoped>
.full-page-container {
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;

  height: 100vh;
  width: 100vw;

  margin: 0;
  padding: 0;
}
</style>