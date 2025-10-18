<template>
  <RouterView />
</template>

<script setup lang="ts">
import { useApiClientConfig } from './api/useApiClientConfig'
import { useRedirectEventListener } from './router/redirect/utils'

useRedirectEventListener()
useApiClientConfig()

</script>