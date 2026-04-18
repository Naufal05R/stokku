'use client'

import type { Table } from '@tanstack/react-table'

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

import { Button } from '../ui'

interface DataTablePaginationControlsProps<TData> {
  table: Table<TData>
}

export const DataTablePaginationPageControls = <TData,>({
  table,
}: DataTablePaginationControlsProps<TData>) => {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        className="size-8"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <span className="sr-only">Go to first page</span>
        <ChevronsLeft />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="size-8"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <span className="sr-only">Go to previous page</span>
        <ChevronLeft />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="size-8"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <span className="sr-only">Go to next page</span>
        <ChevronRight />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="size-8"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        <span className="sr-only">Go to last page</span>
        <ChevronsRight />
      </Button>
    </div>
  )
}
