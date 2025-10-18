<template>
  <CDropdown
    variant="nav-item"
    placement="bottom-end"
  >
    <CDropdownToggle :caret="false">
      <CIcon
        v-if="colorMode === 'dark'"
        :icon="iconsSet.moonIcon"
        size="lg"
      />
      <CIcon
        v-else-if="colorMode === 'light'"
        :icon="iconsSet.sunIcon"
        size="lg"
      />
      <CIcon
        v-else
        :icon="iconsSet.contrastIcon"
        size="lg"
      />
    </CDropdownToggle>
    <CDropdownMenu>
      <CDropdownItem
        :active="colorMode === 'light'"
        class="d-flex align-items-center"
        component="button"
        type="button"
        @click="setColorMode('light')"
      >
        <CIcon
          class="me-2"
          :icon="iconsSet.sunIcon"
          size="lg"
        /> Светлая
      </CDropdownItem>
      <CDropdownItem
        :active="colorMode === 'dark'"
        class="d-flex align-items-center"
        component="button"
        type="button"
        @click="setColorMode('dark')"
      >
        <CIcon
          class="me-2"
          :icon="iconsSet.moonIcon"
          size="lg"
        /> Темная
      </CDropdownItem>
      <CDropdownItem
        :active="colorMode === 'auto'"
        class="d-flex align-items-center"
        component="button"
        type="button"
        @click="setColorMode('auto')"
      >
        <CIcon
          class="me-2"
          :icon="iconsSet.contrastIcon"
          size="lg"
        /> Авто
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script setup lang="ts">
import { useColorModes } from '@coreui/vue'

import { iconsSet } from '@/shared/ui/assets/icons'

const { colorMode, setColorMode } = useColorModes('coreui-free-vue-admin-template-theme')
</script>

<style scoped>

</style>