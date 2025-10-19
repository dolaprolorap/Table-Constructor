import { ColumnTypes } from '../model/ColumnTypes'

export const ColumnTypesRu = {
	[ColumnTypes.string]: 'Текст',
	[ColumnTypes.number]: 'Число',
	[ColumnTypes.timestamp]: 'Дата/время',
	[ColumnTypes.enum]: 'Перечисление',
} as const