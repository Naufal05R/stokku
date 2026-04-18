'use client'

import type { ColumnDef, Row } from '@tanstack/react-table'
import type { Item, Transaction } from '@/payload-types'

import Link from 'next/link'

import { DataTableColumnHeader } from '@/modules/common/components'
import { Badge } from '@/modules/common/components/ui/badge'
import { cn } from '@/modules/common/utils'

const createRowCheck =
  <T extends Transaction, K extends keyof T extends string ? keyof T : never>(
    columnId: K,
    targetValue: T[K],
  ) =>
  ({ getValue }: Row<T>): boolean =>
    getValue(columnId) === targetValue

const isInboundTransaction = createRowCheck('type', 'inbound')

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'reference',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No. Referensi" className="ml-3" />
    ),
    cell: ({ row }) => (
      <Link
        href={`/admin/collections/transactions/${row.original.id}`}
        className="hover:underline block"
      >
        <div className="px-3">{row.getValue('reference')}</div>
      </Link>
    ),
    enableHiding: false,
    meta: {
      label: 'No. Referensi',
    },
  },
  {
    accessorKey: 'item',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Barang" className="ml-3" />
    ),
    cell: ({ row }) => <div className="px-3">{row.getValue<Item>('item').name}</div>,
    filterFn: (row, columnId, filterValue) => {
      const { name } = row.getValue<Item>(columnId)
      return name.toLowerCase().includes(String(filterValue).toLowerCase())
    },
    meta: {
      label: 'Nama Barang',
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipe Transaksi" className="ml-3" />
    ),
    cell: ({ row }) => {
      const isInbound = isInboundTransaction(row)

      return (
        <Badge
          variant="secondary"
          className={cn(
            'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider',
            isInbound
              ? 'bg-primary/10 text-primary border border-primary/20'
              : 'bg-destructive/10 text-destructive border border-destructive/20',
          )}
        >
          {isInbound ? 'Barang Masuk' : 'Barang Keluar'}
        </Badge>
      )
    },
    enableSorting: false,
    meta: {
      label: 'Tipe Transaksi',
    },
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jumlah" className="ml-3" />
    ),
    cell: ({ row }) => (
      <div className="px-3 font-mono font-bold text-base">
        {isInboundTransaction(row) ? '+' : '-'}
        {row.getValue('quantity')}
      </div>
    ),
    meta: {
      label: 'Jumlah',
    },
  },
  {
    accessorKey: 'note',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Catatan" className="ml-3" />
    ),
    cell: ({ row }) => <div className="px-3">{row.getValue('note') || '-'}</div>,
    meta: {
      label: 'Catatan',
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal" className="mr-3 flex-row-reverse" />
    ),
    cell: ({ row }) => (
      <div className="px-3 text-right">
        {new Date(row.getValue('createdAt')).toLocaleString('id-ID', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
    ),
    enableHiding: false,
    meta: {
      label: 'Tanggal',
    },
  },
]
