import { object, string } from 'yup'

export const LOGIN_FIELD_NAME = 'login'
export const PASSWORD_FIELD_NAME = 'password'

export const loginFormValidationSchema = object({
	[LOGIN_FIELD_NAME]: string().email('Некорректный логин').required('Необходимо указать почту'),
	[PASSWORD_FIELD_NAME]: string().required('Необходимо ввести пароль')
})