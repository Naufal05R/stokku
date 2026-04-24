'use client'

import { Check, ChevronsUpDown } from 'lucide-react'

import { Button } from '@/modules/common/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/modules/common/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/modules/common/components/ui/popover'
import { cn } from '@/modules/common/utils'

interface TransactionItemSelectorProps {
  open: boolean
  setOpen: (o: boolean) => void
  placeholder: string
  value: string
  onChange: (id: string, recordedQty: number) => void
  items: { id: string; name: string; quantity: number }[]
  disabled?: boolean
}

export const TransactionItemSelector = ({
  open,
  setOpen,
  placeholder,
  value,
  onChange,
  items,
  disabled,
}: TransactionItemSelectorProps) => (
  <Popover open={open} onOpenChange={disabled ? undefined : setOpen}>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="w-full justify-between font-normal"
        disabled={disabled}
      >
        {value ? items.find((i) => i.id === value)?.name : placeholder}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
      <Command className="twp">
        <CommandInput placeholder="Cari barang..." />
        <CommandList>
          <CommandEmpty>Barang tidak ditemukan.</CommandEmpty>
          <CommandGroup>
            {items.map((i) => (
              <CommandItem
                key={i.id}
                value={i.name}
                onSelect={() => {
                  onChange(i.id, i.quantity)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn('mr-2 h-4 w-4', value === i.id ? 'opacity-100' : 'opacity-0')}
                />
                {i.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
)
