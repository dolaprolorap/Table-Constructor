<template>
  <CButton
    v-if="displayIcon"
    class="base-table-btn"
    @click="modal?.showModal()"
  >
    <CIcon
      :icon="iconsSet.penIcon"
      size="lg"
    />
  </Cbutton>
  <CButton
    v-else
    color="info"
    @click="modal?.showModal()"
  >
    Изменить
  </CButton>

  <BaseModal
    ref="update-contest-modal"
    :submitted="meta.valid && !noChangeSubmited"
    :hidden="modalHidden"

    @close="closeModal"
    @confirm="sendUpdateRequest"
    @show="showModal"
  >
    <template #modal-header>
      <TextWithIconWrapper
        :icon="iconsSet.penIcon"
      >
        <template #text>
          Изменить: {{ contest.title }}
        </template>
      </TextWithIconWrapper>
    </template>

    <template #modal-body>
      <ContestForm
        v-model="updateCurrentContest"
        :hide="!disableFullUpdate"
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
import { ref, computed, toRefs, useTemplateRef, watch } from 'vue'

import { ApiStatuses } from '@/shared/api'
import { deepCompareObject } from '@/shared/lib/object'
import { iconsSet } from '@/shared/ui/assets/icons'
import { BaseModal, ErrorMessageModal, TextWithIconWrapper } from '@/shared/ui/components'

import { type Contest, isContestFullUpdateble, ContestForm, useUpdateContest, contestValidationSchema } from '@/entities/contests'

const modal = useTemplateRef('update-contest-modal')

interface UpdateContestProps {
  contest: Contest;
  displayIcon?: boolean;
}

const props = defineProps<UpdateContestProps>()

const { contest } = toRefs(props)

const updateCurrentContest = ref<Contest>({ ...contest.value })

const {
  updateContest,
  status,
  error,
  clearError
} = useUpdateContest({ contest })

const { handleSubmit, resetForm, meta } = useForm<Contest>({
  validationSchema: contestValidationSchema
})

const disableFullUpdate = computed(() => {
  return isContestFullUpdateble(contest.value)
})

const noChangeSubmited = computed(() => {
  return deepCompareObject(contest.value, updateCurrentContest.value)
})

const closeModal = (): void => {
  resetForm()
}

const showModal = async(): Promise<void> => {
  updateCurrentContest.value = { ...contest.value }
}

const sendUpdateRequest = handleSubmit((): void => {
  if (!updateCurrentContest.value) {
    return
  }

  if (noChangeSubmited.value) {
    return
  }

  updateContest(updateCurrentContest.value)
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
