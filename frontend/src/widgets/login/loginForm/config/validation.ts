import { object, string } from 'yup'

export const EMAIL_FIELD_NAME = 'email'
export const PASSWORD_FIELD_NAME = 'password'

export const loginFormValidationSchema = object({
	[EMAIL_FIELD_NAME]: string().email('Некорректный email').required('Необходимо указать почту'),
	[PASSWORD_FIELD_NAME]: string().required('Необходимо ввести пароль')
})