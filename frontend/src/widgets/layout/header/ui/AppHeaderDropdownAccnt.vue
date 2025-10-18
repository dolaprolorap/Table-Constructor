<template>
  <CDropdown
    placement="bottom-end"
    variant="nav-item"
    class="w-fit-content"
  >
    <CDropdownToggle
      class="py-0 pe-0 h-100 d-flex"
      :caret="false"
    >
      <UserAvatar />
    </CDropdownToggle>

    <CDropdownMenu class="pt-0">
      <CDropdownHeader
        component="h6"
        class="bg-body-secondary text-body-secondary fw-semibold mb-2 rounded-top"
      >
        Аккаунт
      </CDropdownHeader>

      <CustomNavLink :to="profilePath">
        <CDropdownItem>
          <CIcon :icon="iconsSet.userIcon" /> Профиль
        </CDropdownItem>
      </CustomNavLink>

      <CDropdownDivider />

      <CDropdownItem @click="toLogout">
        <CIcon :icon="iconsSet.accountLogoutIcon" /> Выйти
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>

  <ErrorMessageModal
    :error="error"
    :error-message="error?.errorMessage && error?.errorMessage "
  />
</template>

<script setup lang="ts">
import { iconsSet } from '@/shared/ui/assets/icons'
import { CustomNavLink, ErrorMessageModal } from '@/shared/ui/components'

import { UserAvatar, useUserLogout } from '@/features/users/auth'

interface DropdownAccntProps {
	profilePath: string;
}

defineProps<DropdownAccntProps>()

const { toLogout, error } = useUserLogout()
</script>

<style scoped>
.dropdown-item{
  cursor: pointer;
}
</style>