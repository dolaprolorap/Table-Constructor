<template>
  <CSidebar
    class="border-end"
    color-scheme="dark"
    position="fixed"
    :unfoldable="sidebar.unfoldable"
    :visible="sidebar.visible"
    @visible-change="changeVisible"
  >
    <CSidebarHeader class="border-bottom">
      <AppBrand :base-path="basePath" />
      <CCloseButton
        class="d-lg-none"
        dark
        @click="sidebar.toggleVisible()"
      />
    </CSidebarHeader>
    <AppSidebarNavigation :sidebar-navigation="sidebarNavigation" />
    <CSidebarFooter class="border-top d-none d-lg-flex">
      <CSidebarToggler @click="sidebar.toggleUnfoldable()" />
    </CSidebarFooter>
  </CSidebar>
</template>

<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core'

import AppBrand from './AppBrand.vue'
import AppSidebarNavigation from './AppSidebarNavigation.vue'
import type { HeaderLinkConfig } from '../../types'
import { useSidebarStore } from '../model/SidebareStore'

defineProps<SidebarProps>()

const LARGE_SIZE_BREAKPOINT = 992

interface SidebarProps {
	basePath: string;
	sidebarNavigation: HeaderLinkConfig[];
}

const sidebar = useSidebarStore()

const changeVisible = (value: boolean): void => {
	if (sidebar.visible !== value) {
		sidebar.toggleVisible(value)
	}
}

const handleResize = (): void => {
	if (window.innerWidth < LARGE_SIZE_BREAKPOINT) {
		sidebar.setUnfoldable(false)
	}
}

useResizeObserver(document.body, handleResize)
</script>