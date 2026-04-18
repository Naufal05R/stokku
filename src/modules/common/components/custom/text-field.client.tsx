'use client'

import type { ComponentProps } from 'react'
import type { TextFieldClientProps } from 'payload'

import { useField } from '@payloadcms/ui'

import { getLocaleString } from '@/modules/common/utils'

import { Input } from '../ui'

interface TextFieldInputProps
  extends
    Omit<ComponentProps<typeof Input>, 'type' | 'value' | 'onChange'>,
    Pick<TextFieldClientProps, 'path' | 'field' | 'readOnly'> {}

export const TextFieldInput = ({ path, field, readOnly, ...props }: TextFieldInputProps) => {
  const { value, setValue } = useField<string>({ path })

  return (
    <Input
      type="text"
      placeholder={getLocaleString(field.admin?.placeholder)}
      value={value || ''}
      disabled={readOnly || field.admin?.readOnly}
      readOnly={readOnly || field.admin?.readOnly}
      onChange={(e) => setValue(e.target.value)}
      {...props}
    />
  )
}
