<template>
  <CContainer class="user-avatar">
    {{
      authenticatedUser
        ?
          `${authenticatedUser.last_name[0].toUpperCase()}${authenticatedUser.first_name[0].toUpperCase()}`
        : ''
    }}
  </CContainer>
</template>

<script setup lang="ts">
import { useAuthenticatedUserStore } from '../model/AuthenticatedUserStore'

const { authenticatedUser } = useAuthenticatedUserStore()

</script>

<style scoped lang="scss">
.user-avatar{
  width: 90%;
  aspect-ratio: 1 / 1;

  align-self: center;
  justify-self: center;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--cui-gray-300);
  color: var(--cui-gray-600);

  font-weight: 600;

  border-radius: 100%;
}
</style>