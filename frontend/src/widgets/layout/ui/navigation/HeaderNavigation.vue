<template>
  <ul
    class="header-navigation"
    :class="sidebar ? 'header-navigation--sidebar' : 'hidden md:flex'"
  >
    <li
      v-for="navObjectConfig of headerNavigationConfig"
      :key="navObjectConfig.label"
      class="header-navigation__item"
    >
      <RouterLink
        v-if="navObjectConfig.type === 'link'"
        :to="navObjectConfig.to"
        class="header-navigation__item__link"
      >
        {{ navObjectConfig.label }}
      </RouterLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { HeaderNavigationConfig } from '../../model/types'

interface HeaderNavigationProps {
	headerNavigationConfig: HeaderNavigationConfig;
	sidebar?: boolean;
}

defineProps<HeaderNavigationProps>()
</script>

<style lang="scss" scoped>
@use '../AppHeader.scss' as *;

.header-navigation {
    @include app-header;

    gap: 1rem;

    .header-navigation__item {
        color: var(--app-header-text-color);

        .header-navigation__item__link {
            color: var(--app-header-text-color);
            font-weight: 600;

            &:hover {
                color: var(--app-header-text-acent-color);
            }
        }

        .header-navigation__item__link--sidebar {
            color: var(--app-header-text-color);
            font-weight: 600;

            &:hover {
                color: var(--app-header-text-acent-color);
            }
        }
    }
}

.header-navigation.header-navigation--sidebar {
    @include app-header;

    display: flex !important;

    .header-navigation__item__link {
        color: var(--app-sidebar-text-color);
        font-weight: 600;

        &:hover {
            color: var(--app-sidebar-text-acent-color);
        }
    }
}
</style>