'use client'

import type { ComponentType } from 'react'
import type { Column } from '@tanstack/react-table'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Check, PlusCircle } from 'lucide-react'

import { cn } from '@/modules/common/utils'

import {
  Badge,
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from '../ui'

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: {
    label: string
    value: string
    icon?: ComponentType<{ className?: string }>
  }[]
}

export const DataTableFacetedFilter = <TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) => {
  const facets = column?.getFacetedUniqueValues()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  if (!column?.id) return

  const selectedValues = new Set(searchParams.get(column.id)?.split(','))

  const handleSelect = (value: string) => {
    if (selectedValues.has(value)) {
      selectedValues.delete(value)
    } else {
      selectedValues.add(value)
    }

    const params = new URLSearchParams(searchParams.toString())
    const currentFilters = new Set(params.get(column.id)?.split(',').filter(Boolean))

    if (currentFilters.has(value)) {
      currentFilters.delete(value)
    } else {
      currentFilters.add(value)
    }

    const filterValues = Array.from(currentFilters)

    if (filterValues.length > 0) {
      params.set(column.id, filterValues.join(','))
    } else {
      params.set(column.id, '')
    }

    router.replace(`${pathname}?${params.toString()}`)
  }

  const handleClear = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(column.id, '')
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="capitalize h-8 border-dashed">
          <PlusCircle />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                {selectedValues.size}
              </Badge>
              <div className="hidden gap-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="twp w-50 p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList className="no-scrollbar">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      handleSelect(option.value)
                    }}
                    className="group"
                  >
                    <div
                      className={cn(
                        'flex size-4 items-center justify-center rounded border',
                        isSelected
                          ? 'bg-primary border-primary text-primary-foreground'
                          : 'border-input group-data-[selected=true]:border-accent-foreground/30 [&_svg]:invisible',
                      )}
                    >
                      <Check className="text-primary-foreground size-3.5" />
                    </div>
                    {option.icon && (
                      <option.icon className="size-4 group-data-[selected=true]:stroke-accent-foreground" />
                    )}
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className="text-muted-foreground ml-auto flex size-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem onSelect={handleClear} className="justify-center text-center">
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
