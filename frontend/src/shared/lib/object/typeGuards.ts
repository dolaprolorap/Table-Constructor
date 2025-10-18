import type { Primitive } from '@/shared/types/object'

/**
 * Проверяет является ли значение примитивом или null.
 */

export function isPrimitive(value: unknown): value is Primitive {
  if (!value || typeof value !== 'object') {
    return true
  }

  return false
}

/**
 * Проверяет является ли объект массивом переданного типа.
 * @param value Объект который необходимо проверить.
 * @param itemChecker TypeGuard для значений массива.
 */

export function isArray<Item=unknown>(value: unknown, itemChecker: (item: unknown) => item is Item): value is Item[] {
  if (!Array.isArray(value)) {
    return false
  }

  return value.every(itemChecker)
}