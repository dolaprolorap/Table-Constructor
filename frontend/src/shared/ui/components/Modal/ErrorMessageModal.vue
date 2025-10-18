<template>
  <CModal
    :id="id"
    :visible="visible"
    aria-labelledby="error-message"
    class="error-message__modal"
    :teleport="true"
    @close="hideError"
  >
    <CModalHeader>
      <CModalTitle>Произошла ошибка</CModalTitle>
    </CModalHeader>

    <CModalBody>{{ errorMessage || DEFAULT_ERROR_MESSAGE }}</CModalBody>

    <CModalFooter>
      <CButton
        color="secondary"
        @click="hideError"
      >
        Закрыть
      </CButton>
    </CModalFooter>
  </CModal>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'

const DEFAULT_ERROR_MESSAGE = 'Неизвестная ошибка. Повторите действие или обратитесь в техническую поддержку'

interface ErrorMessageModalProps {
  id?: string;
  error: unknown;
  errorMessage?: string;
}

const props = defineProps<ErrorMessageModalProps>()

const { error, errorMessage } = toRefs(props)

interface ErrorMessageModalEmits {
  (event: 'hide-error'): void;
}

const emit = defineEmits<ErrorMessageModalEmits>()

const visible = ref(false)

const showError = (): void => {

  if (!error.value) {
    return
  }

  visible.value = true
}

const hideError = (): void => {
  visible.value = false

  emit('hide-error')
}

watch(error, showError, { deep: true })

</script>