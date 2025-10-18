<template>
  <CCard class="small-card" @click="$emit('select', id)">
    <CCardBody class="text-center">
      <CIcon :icon="iconsSet.fileIcon" size="3xl" class="card-icon mb-3" />
      <CCardTitle>{{ title }}</CCardTitle>
    </CCardBody>
  </CCard>
</template>

<script setup lang="ts">
import { CCard, CCardBody, CCardTitle } from '@coreui/vue'
import { iconsSet } from '../../assets/icons';

interface SmallCardProps {
  id: number
  title: string
}

interface Emits {
    (event: 'select', id: number): void
}

defineProps<SmallCardProps>()
defineEmits<Emits>()
</script>

<style scoped>
.small-card {
  width: 220px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.small-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
