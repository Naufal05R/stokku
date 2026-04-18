import type { Populated } from '@/modules/common/types'

export function isPopulated<T extends object, K extends keyof T>(
  obj: T | null | undefined,
  key: K,
): obj is T & Populated<T, K> {
  return (
    !!obj &&
    typeof obj === 'object' &&
    key in obj &&
    obj[key] !== null &&
    typeof obj[key] === 'object' &&
    !Array.isArray(obj[key])
  )
}

export function assertsPopulated<T extends object, K extends keyof T>(
  obj: T | null | undefined,
  key: K,
): asserts obj is T & Populated<T, K> {
  if (!isPopulated(obj, key)) throw new Error(`Expected ${String(key)} to be populated`)
}
