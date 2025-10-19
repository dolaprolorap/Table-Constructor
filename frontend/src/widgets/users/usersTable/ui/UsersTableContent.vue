<template>
  <UsersTableItem
    v-for="(user, index) in users"
    :key="index"
    :user="user"
  />
</template>
<script setup lang="ts">
import type { User } from '@/entities/users'

import UsersTableItem from './UsersTableItem.vue'

interface UsersTabelContentProps {
	users: User[];
}

defineProps<UsersTabelContentProps>()
</script>