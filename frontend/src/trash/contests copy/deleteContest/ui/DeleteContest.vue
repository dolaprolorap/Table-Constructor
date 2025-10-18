<template>
  <CButton
    v-if="displayIcon"
    class="base-table-btn"
    @click="modal?.showModal()"
  >
    <CIcon
      :icon="iconsSet.trashIcon"
      size="lg"
    />
  </CButton>

  <CButton
    v-else
    color="danger"
    @click="modal?.showModal()"
  >
    Удалить
  </CButton>

  <BaseModal
    ref="delete-contest-modal"
    @confirm="submitDelete"
  >
    <template #modal-header>
      <TextWithIconWrapper
        :icon="iconsSet.trashIcon"
      >
        <template #text>
          Удалить: {{ contest.title }}
        </template>
      </TextWithIconWrapper>
    </template>

    <template #modal-body>
      <CAlert
        color="danger"
        class="alert__container"
      >
        Внимание! Удаление конкурса может привести к непредвиденным последствиям!
      </CAlert>
    </template>
  </BaseModal>

  <ErrorMessageModal
    :error="error"
    :error-message="error?.errorMessage && error.errorMessage"

    @hide-error="clearError"
  />
</template>

<script setup lang="ts">
import { toRefs, useTemplateRef, watch } from 'vue'

import { ApiStatuses } from '@/shared/api'
import { iconsSet } from '@/shared/ui/assets/icons'
import { BaseModal, ErrorMessageModal, TextWithIconWrapper } from '@/shared/ui/components'

import { type Contest, useDeleteContest } from '@/entities/contests'

const modal = useTemplateRef('delete-contest-modal')

interface DeleteContestProps {
  contest: Contest;
  contestId: number;
  displayIcon?: boolean;
}

const props = defineProps<DeleteContestProps>()

const { contest, contestId } = toRefs(props)

const { deleteContest, error, status, clearError } = useDeleteContest()

const submitDelete = (): void => {
  deleteContest({ contestId: contestId.value })
}

watch(status, () => {
  if(status.value !== ApiStatuses.success) {
    modal.value?.closeModal()
  }
})

</script>

<style scoped lang="css">
  .alert__container {
    margin: 0;
  }
</style>