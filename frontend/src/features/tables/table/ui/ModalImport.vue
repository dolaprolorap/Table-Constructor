<template>
  <BaseModal ref="modalRef" :visible="isVisible" @close="close">
    <template #modal-header>
      Импорт Excel-таблиц
    </template>

    <template #modal-body>
      <div class="modal-body-content">
        <CFormInput type="file" id="formFile"  @change="onFileChange" />
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CFormInput } from '@coreui/vue'
import { BaseModal } from '@/shared/ui/components'

interface Emits {
  (event: 'import', file: File | null): void
}
const emit = defineEmits<Emits>()

const isVisible = ref(false)
const selectedFile = ref<File | null>(null)

function open() {
  isVisible.value = true
}
function close() {
  isVisible.value = false
}

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  selectedFile.value = input.files?.[0] ?? null
}

function onImport() {
  emit('import', selectedFile.value)
  close()
}

defineExpose({ open, close })
</script>

<style scoped>
.modal-body-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.import-btn {
  display: flex;
  align-items: center;
  gap: 6px;
}
</style>
