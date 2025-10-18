<template>
  <CHeader
    position="sticky"
    :class="headerClassNames"
  >
    <CContainer
      class="border-bottom px-4"
      fluid
    >
      <CHeaderToggler
        style="margin-inline-start: -14px"
        @click="toggleSidebar"
      >
        <CIcon
          :icon="iconsSet.menuIcon"
          size="lg"
        />
      </CHeaderToggler>

      <AppHeaderNavigation :header-navigation="headerNavigation" />

      <CHeaderNav>
        <li class="nav-item py-1">
          <div class="vr h-100 mx-2 text-body text-opacity-75"></div>
        </li>
        <AppThemeChooser />
        <li class="nav-item py-1">
          <div class="vr h-100 mx-2 text-body text-opacity-75"></div>
        </li>
        <AppHeaderDropdownAccnt :profile-path="profilePath" />
      </CHeaderNav>
    </CContainer>
    <CContainer
      class="px-4"
      fluid
    >
      <AppBreadcrumb />
    </CContainer>
  </CHeader>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { iconsSet } from '@/shared/ui/assets/icons'

import AppBreadcrumb from './AppBreadcrumb.vue'
import AppHeaderDropdownAccnt from './AppHeaderDropdownAccnt.vue'
import AppHeaderNavigation from './AppHeaderNavigation.vue'
import AppThemeChooser from './AppThemeChooser.vue'
import type { HeaderLinkConfig } from '../../types'

interface HeaderProps {
	profilePath: string;
	headerNavigation: HeaderLinkConfig[];
	toggleSidebar: () => void;
}

defineProps<HeaderProps>()

const headerClassNames = ref('p-0')

onMounted(() => {
	document.addEventListener('scroll', () => {
		if (document.documentElement.scrollTop > 0) {
			headerClassNames.value = 'p-0 shadow-sm'
		}
		else {
			headerClassNames.value = 'p-0'
		}
	})
})

</script>