<template>
  <div class="d-flex gap-2 mb-2">
    <BaseFormInput
      name=""
      placeholder="Название таблицы"
    />

    <CButton
      color="primary"
      class="w-100"
    >
      Ввести данные
    </CButton>
  </div>
</template>

<script setup lang="ts">
import { BaseFormInput } from '@/shared/ui/components'

</script>