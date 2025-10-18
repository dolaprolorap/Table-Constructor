import type { FlattenableValue, Primitive, UnflattenObject } from '@/shared/types/object'

import { isArray, isPrimitive } from './typeGuards'

/**
 * Преобразует объект, рекурсивно содержащий подобъекты в плоский объект (без вложенных подобъектов).
 * ВАЖНО: значения объектов должны быть либо null, либо примитивом, либо массивом примитивов, либо вложенным полем.
 * ВАЖНО: ключи объекта не должны содержать separator, иначе невозможно будет применить unflattenedObject
 *
 * @param unflattenedObject Объект, рекурсивно содержащий подобъекты.
 * @param separator Разделитель, последовательно объединяющий все ключи вложенных родительских и дочерних полей.
 * (по умолчанию '.')
 *
 * @returns Плоский объект.
 */

export function flattenObject<Value=unknown>(unflattenedObject: UnflattenObject<FlattenableValue<Value>>, separator = '.'): { [key: string]: FlattenableValue<Value> } {
  const flattenedObject: { [key: string]: FlattenableValue<Value> } = {}

  for (const [key, value] of Object.entries(unflattenedObject)) {
    // Проверка на null, примитивы и массивы примитивов
    if (isPrimitive(value) || isArray<Primitive>(value, isPrimitive)) {
      flattenedObject[key] = value

      continue
    }

    // Значение value может быть либо примитивом, либо массивом примитивов, либо null, либо UnflattenObject<Value>
    const nestedFlattenedObject = flattenObject<Value>(value as UnflattenObject<FlattenableValue<Value>>)

    for (const [nestedKey, nestedValue] of Object.entries(nestedFlattenedObject)) {
      flattenedObject[`${key}${separator}${nestedKey}`] = nestedValue
    }
  }

  return flattenedObject
}