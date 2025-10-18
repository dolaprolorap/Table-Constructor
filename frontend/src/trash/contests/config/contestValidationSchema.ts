import { object, string, date } from 'yup'

import { categoriesValidationSchema } from '@/entities/achievements/categories/@x/contests'

export const contestValidationSchema = object({
  title: string().required('Название конкурса обязательно').min(3, 'Название конкурса должно содержать минимум 3 символа').max(100, 'Превышено максимальное допустимое количество символов'),
  description: string().required('Описание конкурса обязательно').max(500, 'Превышено максимальное допустимое количество символов').min(3, 'Описание конкурса должно содержать минимум 3 символа'),
  categories: categoriesValidationSchema,
  started_at: date().required('Дата начала конкурса обязательна'),
  ended_at: date().required('Дата окончания конкурса обязательна')
})