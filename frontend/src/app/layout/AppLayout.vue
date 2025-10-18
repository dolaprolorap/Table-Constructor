<template>
  <div>
    <AppSidebar
      :sidebar-navigation="headerNavigationConfig"
      :base-path="basePath"
    />
    <div class="wrapper d-flex flex-column min-vh-100">
      <AppHeader
        :profile-path="profilePath"
        :header-navigation="headerNavigationConfig"

        :toggle-sidebar="toggleSidebarVisibility"
      />

      <div class="body flex-grow-1">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AppHeader, AppSidebar, useSidebarStore } from '@/widgets/layout'

import { useHeaderNavigationConfig } from '../router/navigation'

interface LayoutProps {
	profilePath: string;
	basePath: string;
}

defineProps<LayoutProps>()

const sidebar = useSidebarStore()

const toggleSidebarVisibility = (): void => {
	if (sidebar.unfoldable) {
		sidebar.setUnfoldable(false)
	}

	sidebar.toggleVisible()
}

const { headerNavigationConfig } = useHeaderNavigationConfig()

</script>