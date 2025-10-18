<template>
  <CButton
    id="add-contest-btn"
    color="primary"
    @click="modal?.showModal()"
  >
    <CIcon
      :icon="iconsSet.plusIcon"
      size="lg"
    />
  </CButton>

  <BaseModal
    ref="add-contest-modal"
    :submitted="meta.valid"
    :hidden="modalHidden"

    @close="closeModal"
    @confirm="sendRequest"
  >
    <template #modal-header>
      <TextWithIconWrapper :icon="iconsSet.plusIcon">
        <template #text>
          Создать конкурс
        </template>
      </TextWithIconWrapper>
    </template>

    <template #modal-body>
      <ContestForm
        v-model="newContest"
        :hide="false"
      />
    </template>
  </BaseModal>

  <ErrorMessageModal
    :error="error"
    :error-message="error?.errorMessage"
    @hide-error="clearError"
  />
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { ref, watch, useTemplateRef } from 'vue'

import { ApiStatuses } from '@/shared/api'
import { iconsSet } from '@/shared/ui/assets/icons'
import { TextWithIconWrapper, BaseModal, ErrorMessageModal } from '@/shared/ui/components'

import { ContestForm, useCreateContest, type NewContest, contestValidationSchema } from '@/entities/contests'

const modal = useTemplateRef('add-contest-modal')

const { status, createContest, error, clearError } = useCreateContest()

const newContest = ref<NewContest>({})

const { handleSubmit, resetForm, meta } = useForm<NewContest>({
  validationSchema: contestValidationSchema
})

const closeModal = (): void => {
  resetForm()

  newContest.value = {}
}

const sendRequest = handleSubmit((): void => {

  const form = newContest.value

  if(!form.title || !form.description || !form.categories || !form.startDate || !form.endDate ) {
    return
  }

  createContest({
    title: form.title,
    description: form.description,
    categories: form.categories,
    startDate: new Date(form.startDate),
    endDate: new Date(form.endDate)
  })
})

watch(status, () => {
  if (status.value === ApiStatuses.success) {
    closeModal()

    modal.value?.closeModal()
  }
})

const modalHidden = ref<boolean>(false)

watch(error, ()=>{
  modalHidden.value = !!error.value
}, { deep: true })

</script>

<style scoped lang="scss">
#add-contest-btn {
  width: 10rem;
}

.textarea {
  max-height: 300px;
}
</style>
