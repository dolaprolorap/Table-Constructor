import { UTCDate } from '@date-fns/utc'
import { format, type Locale } from 'date-fns'
import { ru } from 'date-fns/locale' // eslint-disable-line
import type { DateFormats } from './config'

export function formatDate(date: string | Date, dateFormat: DateFormats = 'd MMMM yyyy', locale: Locale = ru): string {
  return format(new Date(date), dateFormat, { locale })
}

export function formatDateUTC(date: string | Date, dateFormat: DateFormats = 'yyyy-MM-dd HH:mm:ss', locale: Locale = ru): string {
  return format(new UTCDate(date), dateFormat, { locale })
}