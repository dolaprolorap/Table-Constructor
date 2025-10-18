<template>
  <RouterLink
    v-slot="{ isActive, href, navigate }"
    :to="item.to"
    style="text-decoration: none"
  >
    <CNavItem
      as="div"
      :active="isActive"
      :href="href"
      :on-click="() => {
        return navigate()
      }"
    >
      <span class="nav-icon"><span class="nav-icon-bullet"></span></span>

      {{ item.label }}
    </CNavItem>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

import type { HeaderLinkConfig } from '../../types'

interface NavigationItemProps {
	item: HeaderLinkConfig;
}

defineProps<NavigationItemProps>()
</script>