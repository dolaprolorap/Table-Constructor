<template>
  <RouterLink
    :to="to"
    class="custom-link"
  >
    <slot />
  </RouterLink>
</template>

<script setup lang="ts">

interface NavLinkProps {
  to: string;
}

defineProps<NavLinkProps>()

</script>

<style scoped lang="scss">
.custom-link{
    text-decoration: none;
}
</style>