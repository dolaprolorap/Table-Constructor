<template>
  <CButton
    id="add-user-btn"
    color="primary"
    @click="modal?.showModal()"
  >
    <CIcon
      :icon="iconsSet.plusIcon"
      size="lg"
    />
  </CButton>

  <BaseModal
    ref="add-user-modal"
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
      <CForm
        class="login-form"
        @submit.prevent="sendRequest"
      >
        <BaseFormInput
          id="add-login"
          v-model="login"
          :name="LOGIN_FIELD_NAME"
          placeholder="Логин"
        />

        <BaseFormInput
          id="add-first-name"
          v-model="login"
          :name="FIRST_NAME_FIELD_NAME"
          placeholder="Имя"
        />

        <BaseFormInput
          id="add-last-name"
          v-model="login"
          :name="LAST_NAME_FIELD_NAME"
          placeholder="Фамилия"
        />

        <BaseFormInput
          id="add-middle-name"
          v-model="login"
          :name="MIDDLE_NAME_FIELD_NAME"
          placeholder="Очество"
        />

        <UserRolesSelect
          id="add-role"
          v-model="role"
          :name="ROLE_FIELD_NAME"
        />

        <BaseFormInput
          id="add-password"
          v-model="password"
          type="password"
          :name="PASSWORD_FIELD_NAME"
          placeholder="Пароль"
        />

        <BaseFormInput
          id="add-password"
          v-model="password"
          type="password"
          :name="REPEAT_PASSWORD_FIELD_NAME"
          placeholder="Повторите пароль"
        />
      </CForm>
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
import { TextWithIconWrapper, BaseModal, ErrorMessageModal, BaseFormInput } from '@/shared/ui/components'

import type { UserRoles } from '@/entities/users'
import { UserRolesSelect } from '@/entities/users'
import { useAddUser } from '@/entities/users/api'

import { addUserValidationSchema, FIRST_NAME_FIELD_NAME, LAST_NAME_FIELD_NAME, LOGIN_FIELD_NAME, MIDDLE_NAME_FIELD_NAME, PASSWORD_FIELD_NAME, REPEAT_PASSWORD_FIELD_NAME, ROLE_FIELD_NAME } from '../config/validation'

const modal = useTemplateRef('add-user-modal')

const { status, addUser, error, clearError } = useAddUser()

const login = ref<string>()
const firstName = ref<string>()
const lastName = ref<string>()
const middleName = ref<string>()
const password = ref<string>()
const role = ref<UserRoles>()

const { handleSubmit, resetForm, meta } = useForm({
	validationSchema: addUserValidationSchema
})

const closeModal = (): void => {
	resetForm()
}

const sendRequest = handleSubmit((): void => {

	if (!login.value || !firstName.value || !lastName.value || !middleName.value || !password.value || !role.value) {
		return
	}

	addUser({
		login: login.value,
		firstName: firstName.value,
		lastName: lastName.value,
		middleName: middleName.value,
		password: password.value,
		role: role.value
	})
})

watch(status, () => {
	if (status.value === ApiStatuses.success) {
		closeModal()

		modal.value?.closeModal()
	}
})

const modalHidden = ref<boolean>(false)

watch(error, () => {
	modalHidden.value = !!error.value
}, { deep: true })

</script>

<style scoped lang="scss">
#add-user-btn {
  width: 10rem;
}

.textarea {
  max-height: 300px;
}
</style>
