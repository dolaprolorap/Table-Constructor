<template>
  <BaseModal ref="modalRef" :visible="isVisible" @close="close">
    <template #modal-header>
      Создание новой таблицы
    </template>

    <template #modal-body>
      <CreateTableForm
        v-model:title="title"
        v-model:columns="columns"
        @submit="handleSubmit"
      />
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BaseModal } from '@/shared/ui/components'
import CreateTableForm from './CreateTableForm.vue'

type DataType = 'string' | 'number' | 'timestamp' | 'enum'

type Column = { 
    id: number; 
    name: string; 
    type: DataType | '' 
}

const emit = defineEmits<{
  (event: 'create', payload: { 
    title: string;
    columns: Column[] }): void
}>()

const isVisible = ref(false)
const title = ref<string>('')
const columns = ref<Column[]>([{ id: 1, name: '', type: '' }])

function open() {
  isVisible.value = true
  title.value = ''
  columns.value = [{ id: 1, name: '', type: '' }]
}

function close() {
  isVisible.value = false
}

function handleSubmit(payload: { title: string; columns: Column[] }) {
  emit('create', payload)
  close()
}

defineExpose({ open, close })
</script>

<style scoped>
.modal-body-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.field-label {
  font-size: 0.95rem;
  color: var(--cui-body-color, #212529);
}
.hint {
  color: var(--cui-text-muted, #6c757d);
}
.error-text {
  color: #dc3545;
  font-size: 0.9rem;
}
.footer-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}
</style>
