<template>
  <CCard class="login-form__container">
    <CCardBody>
      <CCardTitle class="login-form__title">
        Авторизация
      </CCardTitle>

      <CForm
        class="login-form"
        @submit.prevent="onSubmit"
      >
        <BaseFormInput
          id="login-login"
          v-model="login"
          :name="LOGIN_FIELD_NAME"
          placeholder="Логин"
        />

        <BaseFormInput
          id="login-password"
          v-model="password"
          type="password"
          :name="PASSWORD_FIELD_NAME"
          placeholder="Пароль"
        />

        <CButton
          type="submit"
          color="primary"
        >
          Войти в аккаунт
        </CButton>
      </CForm>
    </CCardBody>
  </CCard>

  <ErrorMessageModal
    :error="error"
    :error-message="error?.errorMessage"
  />
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { ref } from 'vue'

import { BaseFormInput, ErrorMessageModal } from '@/shared/ui/components'

import { useUserLogin } from '@/features/users/auth'

import { LOGIN_FIELD_NAME, loginFormValidationSchema, PASSWORD_FIELD_NAME } from '../config/validation'

const { handleSubmit } = useForm({
	validationSchema: loginFormValidationSchema
})

const login = ref<string>('')
const password = ref<string>('')

const { toLogin, error } = useUserLogin()

const submitHandler = (): void => {
	toLogin({
		login: login.value,
		password: password.value
	})
}

const onSubmit = handleSubmit(submitHandler)

</script>

<style scoped lang="scss">
.login-form__container {
  position: relative;
  min-width: 400px;
  max-width: 450px;
  width: 40vw;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.login-form__title {
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 2rem;
}

@media(width < $mobile-width-breakpoint){
  .login-form__container  {
    min-width: 90vw;
  }
}
</style>