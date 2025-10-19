<template>
  <CTableDataCell
    colspan="7"
    class="p-3"
  >
    <div>
      <h5>
        {{ `${capitalizeString(user.last_name)} ${capitalizeString(user.first_name)} ${capitalizeString(user.middle_name)}` }}
      </h5>

      <p class="text-body-secondary">
        <strong>Логин: </strong>{{ user.login }}
      </p>

      <p class="text-body-secondary">
        <strong>Роль: </strong>{{ UserRolesRu[user.role] }}
      </p>

      <hr class="my-3 border-top border-light" />

      <span class="buttons">
        <DeleteUser
          :user="user"
          :display-icon="false"
        />
      </span>
    </div>
  </CTableDataCell>
</template>

<script setup lang="ts">
import { capitalizeString } from '@/shared/lib/string'

import { UserRolesRu, type User } from '@/entities/users'

import { DeleteUser } from '@/features/users/deleteUser'

interface UsersTableAccordionProps {
	user: User;
}

defineProps<UsersTableAccordionProps>()

</script>
<style scoped>
.buttons {
  margin-right: 5px;
}
</style>