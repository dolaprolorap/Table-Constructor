<template>
  <span
    v-if="errorMessage"
    class="error-message"
  >
    {{ errorMessage }}
  </span>
</template>

<script setup lang="ts">

interface ErrorMessageProps {
  errorMessage: string;
}

defineProps<ErrorMessageProps>()

</script>

<style scoped lang="scss">
  .error-message {
    width: 100%;
    margin-top: 0.25rem;
    font-size: 0.875em;
    color: var(--cui-form-invalid-color);
  }
</style>