<template>
  <FullPageContainer class="my-3 mb-6 flex-grow-1">
    <div class="wrapper d-flex flex-column min-vh-100">
      <AppHeader
        :header-navigation-config="headerNavigationConfig"
        :profile-page-path="profilePagePath"
      />
      <div class="content my-3 mb-6">
        <div
          class="container flex-grow-1"
          lg
        >
          <RouterView />
        </div>
      </div>
    </div>
  </FullPageContainer>
</template>

<script setup lang="ts">
import { FullPageContainer } from '@/shared/ui/components'

import { AppHeader } from '@/widgets/layout'

import { useHeaderNavigationConfig } from '../router/navigation'

interface AppLayoutProps {
	profilePagePath: string;
}

defineProps<AppLayoutProps>()

const { headerNavigationConfig } = useHeaderNavigationConfig()

</script>