import type { CollectionSlug } from 'payload'
import type { Table } from '@tanstack/react-table'

import { ITEM_OPTION } from '@/modules/items/constants'
import { getMetaLabel } from '@/modules/common/utils'

import { DataTableHeaderSearchBar } from './data-table-header-search-bar'
import { DataTableHeaderViewOptions } from './data-table-header-view-options'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { DataTableHeaderCreateItem } from './data-table-header-create-item'

interface DataTableHeaderProps<TData> {
  table: Table<TData>
  slug: Exclude<CollectionSlug, `payload-${string}`>
  label?: string
}

export const DataTableHeader = <TData,>({ table, slug, label }: DataTableHeaderProps<TData>) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4">
      <DataTableHeaderSearchBar />

      {table
        .getAllColumns()
        .filter(({ columnDef }) => columnDef.enableSorting === false)
        .map(({ id, columnDef }) => (
          <DataTableFacetedFilter
            key={id}
            options={ITEM_OPTION[id]}
            title={getMetaLabel(columnDef.meta) || 'Filter'}
            column={table.getColumn(id)}
          />
        ))}

      <div className="flex-1 flex items-center justify-end gap-4">
        <DataTableHeaderViewOptions table={table} />
        <DataTableHeaderCreateItem href={`/admin/collections/${slug}/create`}>
          {label}
        </DataTableHeaderCreateItem>
      </div>
    </div>
  )
}
