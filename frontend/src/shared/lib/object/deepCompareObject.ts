
import isEqual from 'lodash/isEqual.js'

export function deepCompareObject(obj1: object, obj2: object): boolean {
  return isEqual(obj1, obj2)
}