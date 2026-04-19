import 'server-only'

import type { Item } from '@/payload-types'
import type { Where } from 'payload'

import { payload } from '@/lib/sdk'

export const getItems = async (options?: {
  limit?: number
  page?: number
  sort?: string
  where?: Where
}): Promise<{ docs: Item[]; totalPages: number; totalDocs: number }> => {
  const { limit = 10, page = 1, sort, where } = options || {}

  const result = await payload.find({
    collection: 'items',
    limit,
    page,
    sort,
    where,
  })

  return {
    docs: result.docs,
    totalPages: result.totalPages,
    totalDocs: result.totalDocs,
  }
}

export const getItemById = async (id: string | number): Promise<Item | null> => {
  try {
    const item = await payload.findByID({
      collection: 'items',
      id,
    })

    return item
  } catch {
    return null
  }
}
