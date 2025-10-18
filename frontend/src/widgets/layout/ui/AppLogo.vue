<template>
  <div class="app-logo w-full sm:w-fit flex justify-center md:justify-start">
    <LogoIcon class="app-logo__icon w-[50px] h-[50px] min-w-[50px] min-h-[50px] md:w-[60px] md:h-[60px] md:min-w-[60px] md:min-h-[60px]" />

    <span class="app-logo__text text-3xl md:text-4xl">
      <span class="app-logo__text__acent">Конструктор </span>таблиц
    </span>
  </div>
</template>

<script setup lang="ts">
import { LogoIcon } from '@/shared/ui/assets/icons'

</script>

<style scoped lang="scss">
@use './AppHeader.scss' as *;

.app-logo {
    @include app-header;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-top: 0.5rem;
    margin-left: 1rem;

    z-index: 120 !important;

    .app-logo__icon {
        fill: var(--app-header-text-acent-color);

        margin-bottom: 1rem;
    }

    .app-logo__text {
       font-weight: 600;
       
       color: var(--app-header-text-color);

       .app-logo__text__acent {
            color: var(--app-header-text-acent-color);
       }
    }
}
</style>