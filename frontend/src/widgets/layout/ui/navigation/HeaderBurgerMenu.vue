<template>
  <button
    class="hamburger"
    :class="{ 'is-active': isActive }"
    @click="toggleActive"
  >
    <BurgerIcon class="hamburger__icon" />
  </button>

  <HeaderSidebar
    v-model:visible="isActive"
    :header-navigation-config="headerNavigationConfig"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'

import { BurgerIcon } from '@/shared/ui/assets/icons'

import HeaderSidebar from './HeaderSidebar.vue'
import type { HeaderNavigationConfig } from '../../model/types'

interface HamburgerBurgerMenuProps {
	headerNavigationConfig: HeaderNavigationConfig;
}

defineProps<HamburgerBurgerMenuProps>()

const isActive = ref(false)

const toggleActive = (): void => {
	isActive.value = !isActive.value
}

const router = useRouter()

const beforeRouteLeave = (
	to: RouteLocationNormalized,
	from: RouteLocationNormalized,
	next: NavigationGuardNext
): void => {

	isActive.value = false
	next()
}

router.beforeEach(beforeRouteLeave)

</script>

<style scoped lang="scss">
@use '../AppHeader.scss' as *;

.hamburger {
    @include app-header;

    position: relative;
    z-index: 120 !important;

    .hamburger__icon {
        @extend .header-icon
    }
}
</style>