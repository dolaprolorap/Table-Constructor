<template>
  <header class="app-header">
    <AppLogo />

    <nav class="app-header__navigation">
      <HeaderNavigation
        :header-navigation-config="headerNavigationConfig"
        class="hidden md:flex"
      />

      <div class="flex gap-1">
        <PersonalInfo :profile-page-path="profilePagePath" />

        <HeaderBurgerMenu :header-navigation-config="headerNavigationConfig" />
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import AppLogo from './AppLogo.vue'
import type { HeaderNavigationConfig } from '../model/types'
import HeaderBurgerMenu from './navigation/HeaderBurgerMenu.vue'
import HeaderNavigation from './navigation/HeaderNavigation.vue'
import PersonalInfo from './PersonalInfo.vue'

interface AppHeaderProps {
	headerNavigationConfig: HeaderNavigationConfig;
	profilePagePath: string;
}

defineProps<AppHeaderProps>()

</script>

<style lang="scss" scoped>
@use './AppHeader.scss' as *;

.app-header {
  @include app-header;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 120 !important;

  width: 100vw;
  height: var(--app-header-height);

  background-color: var(--app-header-bg-color);

  display: flex;
  justify-content: space-between;

  .app-header__navigation {
    display: flex;
    align-items: center;

    margin-right: 1rem;
    gap: 2rem;
  }
}
</style>