import type { Table } from '@tanstack/react-table'

import { DataTablePaginationSizeSelector } from './data-table-pagination-size-selector'
import { DataTablePaginationPageControls } from './data-table-pagination-page-controls'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  selectable?: boolean
}

export const DataTablePagination = <TData,>({
  table,
  selectable,
}: DataTablePaginationProps<TData>) => {
  return (
    <div className="flex items-center justify-between p-4">
      {selectable && (
        <div className="max-sm:hidden text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      )}
      <div className="ml-auto flex items-center space-x-6 lg:space-x-8">
        <DataTablePaginationSizeSelector table={table} />
        <div className="max-sm:hidden flex w-25 items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <DataTablePaginationPageControls table={table} />
      </div>
    </div>
  )
}
