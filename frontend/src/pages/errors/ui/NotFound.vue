<template>
  <BasePageContainer>
    <template #title>
      Ошибка 404
    </template>

    <SAlertCard type="error">
      Страница не найдена.

      <a
        @click="redirectToHome"
      >
        Вернуться на главную
      </a>
    </SAlertCard>
  </BasePageContainer>
</template>

<script setup lang="ts">

import { useRedirectToHome } from '@/shared/lib/router'
import { BasePageContainer } from '@/shared/ui/components'

const { redirectToHome } = useRedirectToHome()
</script>
