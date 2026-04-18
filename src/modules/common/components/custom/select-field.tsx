import { CSSProperties } from 'react'

import type { SelectFieldServerProps } from 'payload'

import { getLabel } from '@/modules/common/utils'

import { Label } from '../ui'

import { SelectFieldInput } from './select-field.client'

export const SelectField = ({ field, path, clientField, readOnly }: SelectFieldServerProps) => {
  return (
    <div
      className="field-type text space-y-2"
      style={{ '--field-width': field.admin?.width } as CSSProperties}
    >
      <Label htmlFor={field.name}>
        {getLabel(field.label)}
        {field.required && <span className="text-destructive">*</span>}
      </Label>
      <SelectFieldInput name={field.name} path={path} field={clientField} readOnly={readOnly} />
    </div>
  )
}
