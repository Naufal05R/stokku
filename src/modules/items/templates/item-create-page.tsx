import type { DocumentViewServerProps } from 'payload'

import { Form } from '@payloadcms/ui'

import { ItemCreate } from '../components'

export const ItemCreatePage = ({ formState, routeSegments }: DocumentViewServerProps) => {
  const id =
    Array.isArray(routeSegments) && routeSegments.length > 2 ? routeSegments[2] : undefined
  const isEdit = !!id && id !== 'create'

  return (
    <Form
      method={isEdit ? 'PATCH' : 'POST'}
      action={isEdit ? `/api/items/${id}` : '/api/items'}
      initialState={formState}
    >
      <ItemCreate id={id} isEdit={isEdit} />
    </Form>
  )
}
