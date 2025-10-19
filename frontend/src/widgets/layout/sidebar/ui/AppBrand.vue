<template>
  <RouterLink
    v-slot="{ href, navigate }"
    custom
    :to="basePath"
  >
    <CSidebarBrand
      v-bind="$attrs"
      as="a"
      :href="href"
      @click="navigate"
    >
      <div class="sidebar-brand-full brand-name">
        <CIcon
          :icon="iconsSet.logoIcon"
          class="icon"
          :height="32"
        /> STRUCTURA
      </div>

      <CIcon
        class="sidebar-brand-narrow brand-name"
        :icon="iconsSet.bookIcon"
        :height="32"
      />
    </CSidebarBrand>
  </RouterLink>
</template>

<script setup lang="ts">
import { iconsSet } from '@/shared/ui/assets/icons'

interface AppBrandProps {
	basePath: string;
}

defineProps<AppBrandProps>()

</script>

<style scoped lang="scss">
.sidebar-brand{
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon{
  margin-right : 10px;
}

.brand-name{
    display : flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    font-size: 20px;
    font-weight: 600;
}
</style>