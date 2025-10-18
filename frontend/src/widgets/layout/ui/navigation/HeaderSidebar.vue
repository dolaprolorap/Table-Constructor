<template>
  <template v-if="visible">
    <div
      class="header-sidebar"
      @click.stop
    >
      <div class="header-sidebar__header"></div>

      <div
        class="header-sidebar__content"
      >
        <HeaderNavigation
          :header-navigation-config="headerNavigationConfig"
          class="flex-col"
          sidebar
        />
      </div>
    </div>

    <Teleport to="#app">
      <div
        class="blue-bg"
        @click="hideSidebar"
      ></div>
    </Teleport>
  </template>
</template>

<script setup lang="ts">
import HeaderNavigation from './HeaderNavigation.vue'
import type { HeaderNavigationConfig } from '../../model/types'

interface HeaderSidebarProps {
	headerNavigationConfig: HeaderNavigationConfig;
}

defineProps<HeaderSidebarProps>()

const visible = defineModel<boolean>('visible')

const showSidebar = (): void => {
	visible.value = true
}

const hideSidebar = (): void => {
	visible.value = false
}

interface SidebarExpose {
	showSidebar: () => void;
	hideSidebar: () => void;
}

defineExpose<SidebarExpose>({
	showSidebar,
	hideSidebar
})

</script>

<style lang="scss" scoped>
  @use '../AppHeader.scss' as *;

  .header-sidebar {
    @include app-header;

    position: fixed;
    height: 100vh;
    min-width: 200px;
    width: fit-content;
    right: 0;
    top: 0;
    z-index: 110;

    .header-sidebar__header {
        height: var(--app-header-height);
    }

    .header-sidebar__content {
        padding: 1rem 2rem 4rem;
        overflow-y: auto;
        height: 100%;

        background-color: var(--app-header-sidebar-bg-color);
    }
  }

  .blue-bg {
    position: absolute;
    top: 0;
    left: 0;

    height: 100vh;
    width: 100vw;

    z-index: 50;
  }
</style>