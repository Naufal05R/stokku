'use client'

import type { ComponentProps } from 'react'
import type { SelectFieldClientProps } from 'payload'

import { useField } from '@payloadcms/ui'

import { getLocaleString } from '@/modules/common/utils'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'

interface SelectFieldInputProps
  extends
    Omit<ComponentProps<typeof Select>, 'value' | 'onValueChange'>,
    Pick<SelectFieldClientProps, 'path' | 'field' | 'readOnly'> {}

export const SelectFieldInput = ({ path, field, readOnly, ...props }: SelectFieldInputProps) => {
  const { value, setValue } = useField<string>({ path })

  return (
    <Select value={value} onValueChange={setValue} {...props}>
      <SelectTrigger className="w-full" disabled={readOnly || field.admin?.readOnly}>
        <SelectValue placeholder={getLocaleString(field.admin?.placeholder)} />
      </SelectTrigger>
      <SelectContent>
        {field.options
          ?.filter((option) => typeof option === 'object')
          .map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {getLocaleString(label)}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  )
}
