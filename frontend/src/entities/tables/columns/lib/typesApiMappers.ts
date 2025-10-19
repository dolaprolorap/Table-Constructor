import type { timestamp } from "@vueuse/core";
import { ColumnTypes } from "../model/ColumnTypes";


export const columnsTypesToApi = {
    [ColumnTypes.string]: 'string',
    [ColumnTypes.number]: 'number',
    [ColumnTypes.timestamp]: 'timestamp',
    [ColumnTypes.enum]: 'enum',
} as const

export const apiToColumnsTypes = {
    string: ColumnTypes.string,
    number: ColumnTypes.number,
    timestamp: ColumnTypes.timestamp,
    enum: ColumnTypes.enum,
} as const