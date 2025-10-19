import { ColumnTypes } from "../model/ColumnTypes";

export const ContestTypesUiConfig = {
    [ColumnTypes.string]: 'Текст',
    [ColumnTypes.number]: 'Число',
    [ColumnTypes.timestamp]: 'Дата и время',
    [ColumnTypes.enum]: 'Перечисление',
} as const