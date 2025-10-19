<template>
  <BaseSelect
    :id="id"
    v-model="selectedRole"
    :name="name"
    :label="label"
    :required="required"
    :options="[
      'Выберите роль',
      { label: capitalizeString(UserRolesRu.admin), value: UserRoles.admin },
      { label: capitalizeString(UserRolesRu.editor), value: UserRoles.editor },
      { label: capitalizeString(UserRolesRu.viewer), value: UserRoles.viewer },

    ]"
  />
</template>

<script setup lang="ts">
import { capitalizeString } from '@/shared/lib/string'
import { BaseSelect } from '@/shared/ui/components'

import { UserRolesRu } from './rolesUiConfig'
import { UserRoles } from '../model/Roles'

interface SelectRoleProps {
	label?: string;
	id?: string;
	name: string;
	required?: boolean;
}

defineProps<SelectRoleProps>()

const selectedRole = defineModel<UserRoles>()
</script>