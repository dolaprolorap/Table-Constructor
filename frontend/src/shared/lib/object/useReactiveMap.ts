import { computed, type ComputedRef, shallowRef } from 'vue'

type IdType = string | number

interface UseReactiveMapReturn<T> {
  values: ComputedRef<T[]>;
  size: ComputedRef<number>;
  add: (id: IdType, item: T) => void;
  has: (id: IdType) => boolean;
  get: (id: IdType) => T | undefined;
  delete: (id: IdType) => void;
  clear: () => void;
}

export function useReactiveMap<T>(): UseReactiveMapReturn<T> {
  const map = shallowRef(new Map<IdType, T>())

  const add = (id: IdType, item: T): void => {
    const newMap = new Map(map.value)
    newMap.set(id, item)
    map.value = newMap
  }

  const has = (id: IdType): boolean => {
    return map.value.has(id)
  }

  const get = (id: IdType): T | undefined => {
    return map.value.get(id)
  }

  const deleteItem = (id: IdType): void => {
    const newMap = new Map(map.value)
    newMap.delete(id)
    map.value = newMap
  }

  const clear = (): void => {
    map.value = new Map<number, T>()
  }

  const values = computed<T[]>(() => {
    return Array.from(map.value.values())
  })

  const size = computed<number>(() => {
    return map.value.size
  })

  return {
    add,
    has,
    get,
    delete: deleteItem,
    clear,
    values,
    size
  }
}