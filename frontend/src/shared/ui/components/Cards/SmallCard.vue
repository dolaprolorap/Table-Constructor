<template>
  <CCard
    class="small-card"
    @click="$emit('select', id)"
    :aria-label="title"
    :title="title"
  >
    <CCardBody class="text-center">
      <CIcon :icon="iconsSet.tableIcon" size="xl" class="card-icon mb-2" />
      <CCardTitle class="card-title">{{ title }}</CCardTitle>
    </CCardBody>
  </CCard>
</template>

<script setup lang="ts">
import { CCard, CCardBody, CCardTitle } from '@coreui/vue'
import { iconsSet } from '../../assets/icons'

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
  width: 180px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-radius: 10px;
}

.small-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.ccard-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card-icon {
  color: var(--cui-primary, #3c4b64);
}

.card-title {
  font-size: 0.95rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}
</style>
