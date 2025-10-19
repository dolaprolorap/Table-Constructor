import { object, string, array, mixed } from 'yup'

import { ColumnTypes } from '@/entities/tables/columns'

export const TITLE_FIELD_NAME = 'title'
export const COLUMN_FIELD_NAME = 'column'

export const addTableValidationSchema = object({
	[TITLE_FIELD_NAME]: string().
		trim().
		required('Необходимо указать имя таблицы'),

	[COLUMN_FIELD_NAME]: array().of(
		object({
			title: string().
				trim().
				required('Укажите имя столбца'),

			type: mixed<'string' | 'number' | 'timestamp' | 'enum'>().
				oneOf(Object.values(ColumnTypes), 'Недопустимый тип столбца').
				required('Укажите тип столбца'),

			enumValues: array().
				of(string().trim().required('Пустое значение недопустимо')).
				when('type', {
					is: ColumnTypes.enum,
					then: s =>
						s.min(1, 'Добавьте хотя бы одно значение enum').required('Укажите значения enum'),
					otherwise: s =>
						s.strip(),
				}),
		}).noUnknown(true, 'Неизвестные поля в столбце не допускаются')
	).
		min(1, 'Необходимо добавить хотя бы один столбец').
		required('Необходимо добавить хотя бы один столбец'),
}).noUnknown(true, 'Неизвестные поля в таблице не допускаются')
