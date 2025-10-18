<template>
  <PageContainer>
    <template #page-title>
      404. Страница не найдена.
    </template>

    <CAlert color="danger">
      Данная страница не найдена.

      <BaseLink @click="redirectToHome">
        Перейти на главную
      </BaseLink>
    </CAlert>
  </PageContainer>
</template>

<script setup lang="ts">
import { useRedirectToHome } from '@/shared/lib/router'
import { BaseLink, PageContainer } from '@/shared/ui/components'

const { redirectToHome } = useRedirectToHome()

</script>