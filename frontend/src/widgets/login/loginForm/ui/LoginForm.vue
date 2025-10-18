<template>
  <div class="bg-white p-3">
    <h1>
      Авторизация
    </h1>

    <form
      class="flex flex-col gap-2"
      @submit.prevent="onSubmit"
    >
      <input
        v-model="email"
        type="email"
        class="bg-gray-100"
        :name="EMAIL_FIELD_NAME"
        autocomplete="email"
        placeholder="Email"
      />
      <span
        v-if="emailError"
        class="text-red-500 text-sm"
      >{{ emailError }}</span>

      <input
        v-model="password"
        type="password"
        autocomplete="current-password"
        class="bg-gray-100"
        :name="PASSWORD_FIELD_NAME"
        placeholder="Пароль"
      />
      <span
        v-if="passwordError"
        class="text-red-500 text-sm"
      >{{ passwordError }}</span>

      <button
        type="submit"
        class="bg-blue-400"
      >
        Войти в аккаунт
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'

import { useUserLogin } from '@/features/users/auth'

import { EMAIL_FIELD_NAME, loginFormValidationSchema, PASSWORD_FIELD_NAME } from '../config/validation'

const { handleSubmit } = useForm({
	validationSchema: loginFormValidationSchema
})

const { value: email, errorMessage: emailError } = useField<string>(EMAIL_FIELD_NAME)
const { value: password, errorMessage: passwordError } = useField<string>(PASSWORD_FIELD_NAME)

const { toLogin } = useUserLogin()

const submitHandler = (): void => {
	toLogin({
		email: email.value,
		password: password.value
	})
}

const onSubmit = handleSubmit(submitHandler)

</script>

<style scoped>

</style>