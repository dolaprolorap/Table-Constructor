import { UTCDate } from '@date-fns/utc'
import { parse } from 'date-fns'

import type { DateFormats } from './config'

/**
 * Функция парсит дату в формате 'yyyy-MM-dd HH:mm:ss' (по умолчанию) как UTC дату
 * @param date Строка в формате 'yyyy-MM-dd HH:mm:ss' (формат который используется на беке)
 * @returns Объект Date (локальный)
 */

export function parseDateUTC(date: string, dateFormat: DateFormats = 'yyyy-MM-dd HH:mm:ss'): Date {
  return parse(
    date,
    dateFormat,
    new UTCDate()
  )
}