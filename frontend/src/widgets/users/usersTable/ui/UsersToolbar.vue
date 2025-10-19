<template>
  <div>
    <BaseSearchInput
      v-model="searchedLogin"
      aria-label="User name"
      placeholder="Поиск по логину"
      class="mb-3"
    />

    <div class="d-flex justify-content-between gap-2">
      <UserRolesSelect
        v-model="usersRole"
        name="contest-status"
        all-option
      />
      <AddUser />
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseSearchInput } from '@/shared/ui/components'

import type { UserRoles } from '@/entities/users'
import { UserRolesSelect } from '@/entities/users'

import { AddUser } from '@/features/users/addUser'

const usersRole = defineModel<UserRoles>('role')
const searchedLogin = defineModel<string>('login')
</script>