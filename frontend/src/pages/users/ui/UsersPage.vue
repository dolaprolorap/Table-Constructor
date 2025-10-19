<template>
  <PageContainer>
    <template #page-title>
      Пользователи
    </template>

    <UsersTable />
  </PageContainer>
</template>

<script setup lang="ts">
import { PageContainer } from '@/shared/ui/components'

import { UsersTable } from '@/widgets/users/usersTable'

</script>