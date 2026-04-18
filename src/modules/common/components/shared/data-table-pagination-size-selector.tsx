'use client'

import type { Table } from '@tanstack/react-table'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'

interface DataTablePaginationSizeSelectorProps<TData> {
  table: Table<TData>
}

export const DataTablePaginationSizeSelector = <TData,>({
  table,
}: DataTablePaginationSizeSelectorProps<TData>) => {
  return (
    <div className="flex items-center space-x-2">
      <p className="max-sm:hidden text-sm font-medium">Rows per page</p>
      <Select
        value={`${table.getState().pagination.pageSize}`}
        onValueChange={(value) => table.setPageSize(Number(value))}
      >
        <SelectTrigger className="h-8 w-17.5">
          <SelectValue placeholder={table.getState().pagination.pageSize} />
        </SelectTrigger>
        <SelectContent side="top">
          {[10, 20, 25, 30, 40, 50].map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
