'use client'

import type { ComponentProps } from 'react'
import type { NumberFieldClientProps } from 'payload'

import { useField } from '@payloadcms/ui'

import { getLocaleString } from '@/modules/common/utils'

import { Input } from '../ui'

interface NumberFieldInputProps
  extends
    Omit<ComponentProps<typeof Input>, 'type' | 'value' | 'onChange'>,
    Pick<NumberFieldClientProps, 'path' | 'field' | 'readOnly'> {}

export const NumberFieldInput = ({ path, field, readOnly, ...props }: NumberFieldInputProps) => {
  const { value, setValue } = useField<number>({ path })

  return (
    <Input
      type="number"
      placeholder={getLocaleString(field.admin?.placeholder)}
      value={value || ''}
      disabled={readOnly || field.admin?.readOnly}
      readOnly={readOnly || field.admin?.readOnly}
      onChange={(e) => setValue(e.target.value)}
      {...props}
    />
  )
}
