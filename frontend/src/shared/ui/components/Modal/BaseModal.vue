<template>
  <CModal
    :backdrop="backdrop"
    alignment="center"
    :visible="visible"
    :teleport="true"
    :class="hidden ? 'modal-hidden' : 'show'"
    @close="closeModal"
  >
    <CModalHeader>
      <CModalTitle class="modal-title">
        <slot name="modal-header"></slot>
      </CModalTitle>
    </CModalHeader>

    <CModalBody class="modal-body">
      <slot name="modal-body"></slot>
    </CModalBody>

    <CModalFooter v-if="!hideBtnBox">
      <CButton
        color="secondary"
        @click="closeModal"
      >
        Закрыть
      </CButton>
      <CButton
        v-if="!submitDisabled"
        color="primary"
        :class="{'btn_disabled' : !submitted}"
        @click="confirmModal"
      >
        Подтвердить
      </CButton>
    </CModalFooter>
  </CModal>
</template>

<script setup lang="ts">
import { toRefs, ref } from 'vue'

interface BaseModalProps {
	backdrop?: 'static' | true;
	closeOnConfirm?: boolean;
	submitted?: boolean;
	submitDisabled?: boolean;
	hidden?: boolean;
	hideBtnBox?: boolean;
}

const props = withDefaults(defineProps<BaseModalProps>(), {
	closeOnConfirm: true,
	id: '0',
	backdrop: 'static',
	submitted: true
})

const emit = defineEmits<BaseModalEmits>()

const { submitted } = toRefs(props)

const visible = ref<boolean>(false)

interface BaseModalEmits {
	(event: 'close'): void;
	(event: 'show'): void;
	(event: 'confirm'): void;
}

const closeModal = (): void => {
	emit('close')

	visible.value = false
}

const showModal = (): void => {
	emit('show')

	visible.value = true
}

const confirmModal = (): void => {
	emit('confirm')
}

export interface BaseModalReturn {
	closeModal: () => void;
	showModal: () => void;
}

defineExpose<BaseModalReturn>({
	showModal,
	closeModal
})
</script>

<style>
.modal-body:empty {
  display: none;
}

.modal-hidden .modal-dialog .modal-content{
  opacity: 0;
}

.modal-title{
  width: 90%
}

.btn-close:focus {
    outline: 0;
    box-shadow: none;
    opacity: var(--cui-btn-close-focus-opacity);
}

.btn_disabled {
  opacity: 0.5;
}
</style>