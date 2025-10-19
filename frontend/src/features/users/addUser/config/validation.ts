import { object, string, ref } from 'yup'

export const LOGIN_FIELD_NAME = 'login'
export const FIRST_NAME_FIELD_NAME = 'first-name'
export const LAST_NAME_FIELD_NAME = 'last-name'
export const MIDDLE_NAME_FIELD_NAME = 'middle-name'
export const ROLE_FIELD_NAME = 'role'
export const PASSWORD_FIELD_NAME = 'password'
export const REPEAT_PASSWORD_FIELD_NAME = 'repeat-password'

export const addUserValidationSchema = object({
	[LOGIN_FIELD_NAME]: string().required('Необходимо указать логин').trim(),
	[FIRST_NAME_FIELD_NAME]: string().required('Необходимо указать имя').trim().lowercase(),
	[LAST_NAME_FIELD_NAME]: string().required('Необходимо указать фамилию').trim().lowercase(),
	[MIDDLE_NAME_FIELD_NAME]: string().required('Необходимо указать отчество').trim().lowercase(),
	[ROLE_FIELD_NAME]: string().required('Необходимо выбрать роль').trim().lowercase(),
	[PASSWORD_FIELD_NAME]: string().
		min(6, 'Пароль должен содержать минимум 6 символов').
		required('Необходимо ввести пароль'),
	[REPEAT_PASSWORD_FIELD_NAME]: string().
		oneOf([ref(PASSWORD_FIELD_NAME)], 'Пароли должны совпадать').
		required('Необходимо повторить пароль'),
})