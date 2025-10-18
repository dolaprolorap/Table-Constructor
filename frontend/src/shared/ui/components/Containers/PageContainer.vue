<template>
  <CContainer
    fluid
    class="page__container"
  >
    <h1 class="mb-3">
      <slot name="page-title" />
    </h1>

    <slot />
  </CContainer>
</template>

<style lang="scss" scoped>
@import '@/shared/ui/styles/styles.scss';

.page__container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-bottom: 2rem;
    padding-top: 2rem;
  }

@media(width < $mobile-width-breakpoint){
  .page__container {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}
</style>