'use client'

import type { CollectionSlug } from 'payload'
import type {
  ColumnDef,
  ColumnFiltersState,
  VisibilityState,
} from '@tanstack/react-table'

import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { DataTableHeader } from './data-table-header'
import { DataTableContent } from './data-table-content'
import { DataTablePagination } from './data-table-pagination'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageCount?: number
  slug: Exclude<CollectionSlug, `payload-${string}`>
  label?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  slug,
  label,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)
  const pagination = { pageIndex: page - 1, pageSize: limit }

  const table = useReactTable({
    data,
    columns,
    pageCount,
    manualPagination: !!pageCount,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: (updater) => {
      const { pageIndex, pageSize } = typeof updater === 'function' ? updater(pagination) : updater
      const nextPage = pageIndex + 1
      const nextLimit = pageSize

      if (nextPage === page && nextLimit === limit) return

      const params = new URLSearchParams(searchParams)
      params.set('limit', String(nextLimit))
      params.set('page', String(nextPage))
      router.replace(`${pathname}?${params.toString()}`)
    },
    autoResetPageIndex: false,
    state: {
      columnFilters,
      columnVisibility,
      pagination,
    },
  })

  return (
    <>
      <DataTableHeader table={table} slug={slug} label={label} />
      <DataTableContent table={table} columns={columns} />
      <DataTablePagination table={table} />
    </>
  )
}
