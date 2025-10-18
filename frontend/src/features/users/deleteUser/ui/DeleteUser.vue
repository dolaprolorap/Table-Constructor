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
    ref="delete-user-modal"
    @confirm="submitDelete"
  >
    <template #modal-header>
      <TextWithIconWrapper
        :icon="iconsSet.trashIcon"
      >
        <template #text>
          Удалить: {{ user.login }}
        </template>
      </TextWithIconWrapper>
    </template>

    <template #modal-body>
      <CAlert
        color="warning"
        class="alert__container"
      >
        Удалить пользователя:  {{ `${capitalizeString(user.last_name)} ${capitalizeString(user.first_name)} ${capitalizeString(user.middle_name)}` }}
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
import { capitalizeString } from '@/shared/lib/string'
import { iconsSet } from '@/shared/ui/assets/icons'
import { BaseModal, ErrorMessageModal, TextWithIconWrapper } from '@/shared/ui/components'

import type { User } from '@/entities/users'
import { useDeleteUserById } from '@/entities/users/api'

interface DeleteUserProps {
	user: User;
	displayIcon?: boolean;
}

const props = defineProps<DeleteUserProps>()

const modal = useTemplateRef('delete-user-modal')

const { user } = toRefs(props)

const { deleteUserById, error, status, clearError } = useDeleteUserById()

const submitDelete = (): void => {
	deleteUserById({ userId: user.value.id })
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