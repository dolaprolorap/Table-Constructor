<template>
  <div>
    <div class="actions">
      <CButton color="primary" @click="onCreateTable">
        Создать таблицу
      </CButton>

      <CButton color="secondary" class="import-btn" @click="openImportModal">
        <CIcon :icon="iconsSet.fileIcon" class="me-2" />
        <span>Импорт таблицы</span>
      </CButton>
    </div>

    <ModalImport ref="importModalRef" @close="onCloseImportModal" />
    <ModalCreateTable ref="createModalRef" @close="onCloseCreateModal" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CButton } from '@coreui/vue'
import { iconsSet } from '@/shared/ui/assets/icons'
import { ModalImport, ModalCreateTable } from '@/features/tables/table'

const importModalRef = ref<InstanceType<typeof ModalImport> | null>(null)

function openImportModal() {
  importModalRef.value?.open()
}

function onCloseImportModal() {
  importModalRef.value?.close()
}

function onCreateTable() {
  createModalRef.value?.open()
  console.log('Создать таблицу')
}

const createModalRef = ref<InstanceType<typeof ModalCreateTable> | null>(null)

function openCreateModal() {
  createModalRef.value?.open()
}

function onCloseCreateModal() {
  createModalRef.value?.close()
}

</script>

<style scoped>
.actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.import-btn {
  display: flex;
  align-items: center;
  gap: 6px;
}
</style>
