<template>
  <CButton
    color="secondary"
    class="import-btn"
    @click="modal?.showModal()"
  >
    <CIcon
      :icon="iconsSet.fileIcon"
      class="me-2"
    />
    <span>Импорт таблицы</span>
  </CButton>

  <BaseModal
    ref="import-table-modal"
  >
    <template #modal-header>
      Импорт Excel-таблиц
    </template>

    <template #modal-body>
      <div class="modal-body-content">
        <CFormInput
          id="formFile"
          type="file"
        />
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { CFormInput } from '@coreui/vue'
import { ref, useTemplateRef } from 'vue'

import { iconsSet } from '@/shared/ui/assets/icons'
import { BaseModal } from '@/shared/ui/components'

const selectedFile = ref<File | null>(null)

const modal = useTemplateRef('import-table-modal')

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
