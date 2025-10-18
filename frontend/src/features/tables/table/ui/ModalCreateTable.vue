<template>
  <BaseModal ref="modalRef" :visible="isVisible" @close="close">
    <template #modal-header>
      Создание новой таблицы
    </template>

    <template #modal-body>
      <div class="modal-body-content">
        <label class="field-label" for="table-title">Название таблицы</label>

        <CInputGroup>
          <CInputGroupText>#</CInputGroupText>
          <CFormInput
            id="table-title"
            v-model.trim="title"
            :invalid="isTouched && !isValid"
            placeholder="Например: Продажи за 2025 год"
            autocomplete="off"
            @keyup.enter="tryCreate"
          />
        </CInputGroup>

        <small class="hint">Поле обязательно для заполнения</small>
        <div v-if="isTouched && !isValid" class="error-text">
          Укажите название таблицы.
        </div>
      </div>
    </template>

    <template #modal-footer>
      <div class="footer-actions">
        <CButton color="secondary" variant="outline" @click="close">
          Отмена
        </CButton>
        <CButton color="primary" :disabled="!isValid" @click="tryCreate">
          Создать
        </CButton>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { CButton, CFormInput, CInputGroup, CInputGroupText } from '@coreui/vue'
import { BaseModal } from '@/shared/ui/components'

const emit = defineEmits<{
  (e: 'create', payload: { title: string }): void
}>()

const isVisible = ref(false)
const title = ref('')
const isTouched = ref(false)

const isValid = computed(() => title.value.trim().length > 0)

function open() {
  isVisible.value = true
  title.value = ''
  isTouched.value = false
}

function close() {
  isVisible.value = false
}

function tryCreate() {
  isTouched.value = true
  if (!isValid.value) return
  emit('create', { title: title.value.trim() })
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
  color: #dc3545; /* danger */
  font-size: 0.9rem;
}

.footer-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}
</style>
