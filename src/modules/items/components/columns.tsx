'use client'

import type { ColumnDef } from '@tanstack/react-table'
import type { Item } from '@/payload-types'

import Link from 'next/link'

import { ITEM_CATEGORY_OPTIONS } from '../constants'
import { Badge, DataTableColumnHeader } from '@/modules/common/components'
import { cn } from '@/modules/common/utils'

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: 'code',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kode (SKU)" className="ml-3" />
    ),
    cell: ({ row }) => (
      <Link href={`/admin/collections/items/${row.original.id}`} className="hover:underline block">
        <div className="px-3 font-mono text-sm">{row.getValue('code')}</div>
      </Link>
    ),
    meta: {
      label: 'Kode (SKU)',
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Barang" className="ml-3" />
    ),
    cell: ({ row }) => <div className="px-3 font-medium">{row.getValue('name')}</div>,
    meta: {
      label: 'Nama Barang',
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kategori" className="ml-3" />
    ),
    cell: ({ row }) => {
      const category = row.getValue('category')

      return (
        <div className="px-3">
          {ITEM_CATEGORY_OPTIONS.find(({ value }) => value === category)?.label || '-'}
        </div>
      )
    },
    enableSorting: false,
    meta: {
      label: 'Kategori',
    },
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Stok" className="ml-3" />,
    cell: ({ row }) => {
      const quantity = row.getValue('quantity') as number
      const minQuantity = row.original.minQuantity || 0
      const isLowStock = quantity <= minQuantity

      return (
        <div
          className={cn(
            'px-3 font-mono font-bold text-base flex items-center gap-2',
            isLowStock ? 'text-red-600' : 'text-emerald-600',
          )}
        >
          {quantity}
          {isLowStock && (
            <Badge variant="destructive" className="text-[10px] px-1 py-0 h-4">
              Low
            </Badge>
          )}
        </div>
      )
    },
    meta: {
      label: 'Stok',
    },
  },
  {
    accessorKey: 'unit',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Satuan" className="ml-3" />
    ),
    cell: ({ row }) => (
      <div className="px-3 text-muted-foreground capitalize">{row.getValue('unit')}</div>
    ),
    enableSorting: false,
    meta: {
      label: 'Satuan',
    },
  },
  {
    accessorKey: 'position',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Posisi Rak" className="ml-3" />
    ),
    cell: ({ row }) => <div className="px-3">{row.getValue('position') || '-'}</div>,
    meta: {
      label: 'Posisi Rak',
    },
  },
]
