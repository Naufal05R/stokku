import type { Table } from '@tanstack/react-table'

import { Settings2 } from 'lucide-react'

import { getMetaLabel } from '@/modules/common/utils'

import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui'

interface DataTableHeaderViewOptionsProps<TData> {
  table: Table<TData>
}

export const DataTableHeaderViewOptions = <TData,>({
  table,
}: DataTableHeaderViewOptionsProps<TData>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Settings2 /> View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {getMetaLabel(column.columnDef.meta) || column.id}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
