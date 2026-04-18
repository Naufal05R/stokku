import { CSSProperties } from 'react'

import type { NumberFieldServerProps } from 'payload'

import { getLabel, getLocaleString } from '@/modules/common/utils'

import { Label } from '../ui'

import { NumberFieldInput } from './number-field.client'

export const NumberField = ({ field, path, clientField, readOnly }: NumberFieldServerProps) => {
  return (
    <div
      className="field-type number space-y-2"
      style={{ '--field-width': field.admin?.width } as CSSProperties}
    >
      <Label htmlFor={field.name}>
        {getLabel(field.label)}
        {field.required && <span className="text-destructive">*</span>}
      </Label>
      <NumberFieldInput
        id={field.name}
        path={path}
        field={clientField}
        readOnly={readOnly}
        defaultValue={getLocaleString(field.defaultValue)}
      />
    </div>
  )
}
