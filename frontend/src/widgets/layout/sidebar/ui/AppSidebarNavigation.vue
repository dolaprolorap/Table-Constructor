<template>
  <CSidebarNav :as="simplebar">
    <template
      v-for="navItem in sidebarNavigation"
      :key="navItem.label"
    >
      <NavigationItem
        v-if="navItem.type === HeaderConfigTypes.link"
        :item="navItem"
      />
    </template>
  </CSidebarNav>
</template>

<script setup lang="ts">
import simplebar from 'simplebar-vue'

import NavigationItem from './NavigationItem.vue'
import { HeaderConfigTypes, type HeaderLinkConfig } from '../../types'

interface AppSidebarNavigationProps {
	sidebarNavigation: HeaderLinkConfig[];
}

defineProps<AppSidebarNavigationProps>()
</script>
