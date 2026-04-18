import { DataTable } from '@/modules/common/components'

import { getItems } from '../repositories'

import { columns } from './columns'

import type { Where } from 'payload'

interface ItemListProps {
  page: number
  limit: number
  search?: string
  sort?: string
  category?: string
  unit?: string
}

export const ItemList = async ({ page, limit, search, sort, category, unit }: ItemListProps) => {
  const categories = category ? category.split(',').filter(Boolean) : []
  const units = unit ? unit.split(',').filter(Boolean) : []

  const where: Where = {
    and: [
      search
        ? {
            or: [{ name: { contains: search } }, { code: { contains: search } }],
          }
        : {},
      categories.length > 0
        ? {
            category: {
              in: categories,
            },
          }
        : {},
      units.length > 0
        ? {
            unit: {
              in: units,
            },
          }
        : {},
    ],
  }

  const { docs, totalPages } = await getItems({
    limit,
    page,
    sort,
    where,
  })

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <DataTable
        columns={columns}
        data={docs}
        pageCount={totalPages}
        slug="items"
        label="Tambah Barang"
      />
    </div>
  )
}
