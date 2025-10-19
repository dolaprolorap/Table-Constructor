<template>
  <TableObjectWithAccordion>
    <template #default>
      <CTableDataCell class="w-30">
        {{ user.login }}
      </CTableDataCell>

      <CTableDataCell>
        {{ UserRolesRu[user.role] }}
      </CTableDataCell>

      <CTableDataCell
        @click.stop
      >
        <DeleteUser
          :user="user"
          :display-icon="true"
        />
      </CTableDataCell>
    </template>

    <template #accordion>
      <UsersTableAccordion :user="user" />
    </template>
  </TableObjectWithAccordion>
</template>

<script setup lang="ts">
import { TableObjectWithAccordion } from '@/shared/ui/components'

import { UserRolesRu, type User } from '@/entities/users'

import { DeleteUser } from '@/features/users/deleteUser'

import UsersTableAccordion from './UsersTableAccordion.vue'

interface UserTableItemProps {
	user: User;
}

defineProps<UserTableItemProps>()

</script>