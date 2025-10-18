<template>
  <CHeaderNav class="d-none d-md-flex me-auto">
    <CustomNavLink
      v-for="navItem in headerNavigation"
      :key="navItem.label"
      :to="navItem.to"
    >
      <CNavLink>{{ navItem.label }}</CNavLink>
    </CustomNavLink>
  </CHeaderNav>
</template>

<script setup lang="ts">
import { CustomNavLink } from '@/shared/ui/components'

import type { HeaderLinkConfig } from '../../types'

interface HeaderNavigationProps {
	headerNavigation: HeaderLinkConfig[];
}

defineProps<HeaderNavigationProps>()
</script>