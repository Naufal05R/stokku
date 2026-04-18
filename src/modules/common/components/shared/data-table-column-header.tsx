'use client'

import type { Column } from '@tanstack/react-table'

import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { cn } from '@/modules/common/utils'

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export const DataTableColumnHeader = <TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { id } = column
  const sort = searchParams.get('sort')

  const handleSort = () => {
    const params = new URLSearchParams(searchParams)

    if (!sort || (sort && sort !== id && sort !== `-${id}`)) params.set('sort', id)
    if (sort === id) params.set('sort', `-${id}`)
    if (sort === `-${id}`) params.set('sort', '')

    router.replace(`${pathname}?${params.toString()}`)
  }

  if (!column.getCanSort()) return <div className={className}>{title}</div>

  return (
    <div
      className={cn(
        column.getCanSort() && 'flex items-center cursor-pointer select-none gap-2',
        className,
      )}
      onClick={handleSort}
      onKeyDown={(e) => {
        if (column.getCanSort() && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          handleSort()
        }
      }}
      tabIndex={column.getCanSort() ? 0 : undefined}
    >
      {title}
      <div className="size-4">
        {sort === id && (
          <ChevronUpIcon aria-hidden="true" className="shrink-0 opacity-60" size={16} />
        )}
        {sort === `-${id}` && (
          <ChevronDownIcon aria-hidden="true" className="shrink-0 opacity-60" size={16} />
        )}
      </div>
    </div>
  )
}
