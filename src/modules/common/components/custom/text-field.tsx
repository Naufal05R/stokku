import { CSSProperties } from 'react'

import type { TextFieldServerProps } from 'payload'

import { getLabel, getLocaleString } from '@/modules/common/utils'

import { Label } from '../ui'

import { TextFieldInput } from './text-field.client'

export const TextField = ({ field, path, clientField, readOnly }: TextFieldServerProps) => {
  return (
    <div
      className="field-type text space-y-2"
      style={{ '--field-width': field.admin?.width } as CSSProperties}
    >
      <Label htmlFor={field.name}>
        {getLabel(field.label)}
        {field.required && <span className="text-destructive">*</span>}
      </Label>
      <TextFieldInput
        id={field.name}
        path={path}
        field={clientField}
        readOnly={readOnly}
        defaultValue={getLocaleString(field.defaultValue)}
      />
    </div>
  )
}
