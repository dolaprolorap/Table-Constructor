import type { UnflattenObject } from '@/shared/types/object'

/**
 * Преобразует плоский объект (без вложенных объектов) в объект с рекурсивно вложенными объектами.
 *
 * @param flattenedObject Плоский объект.
 * @param separator Разделитель, последовательно объединяющий все ключи вложенных родительских и дочерних полей.
 * (по умолчанию '.')
 *
 * @returns Объект, рекурсивно содержащий подобъекты.
 */

export function unflattenObject<Value=unknown>(flattenedObject: { [key: string]: Value }, separator = '.'): UnflattenObject<Value> {
  const unflattenedObject: UnflattenObject<Value> = {}

  Object.entries(flattenedObject).forEach(([key, value]) =>{

    if (key.indexOf(separator) === -1) {
      unflattenedObject[key] = value

      return
    }

    const keys = key.split(separator)
    const lastKey = keys[keys.length - 1]
    let nestedUnflattenedObject = unflattenedObject

    keys.slice(0, -1).forEach((currentKey)=>{
      if (typeof nestedUnflattenedObject[currentKey] !== 'object') {
        nestedUnflattenedObject[currentKey] = {}
      }

      nestedUnflattenedObject = nestedUnflattenedObject[currentKey] as { [key: string]: Value }
    })

    nestedUnflattenedObject[lastKey] = value
  })

  return unflattenedObject
}