import { Form } from '@payloadcms/ui'

import { ItemCreate } from '../components'

interface ItemCreatePageProps {
  segments: string[]
}

export const ItemCreatePage = ({ segments }: ItemCreatePageProps) => {
  const id = Array.isArray(segments) && segments.length > 2 ? segments[2] : undefined
  const isEdit = !!id && id !== 'create'

  return (
    <Form method={isEdit ? 'PATCH' : 'POST'} action={isEdit ? `/api/items/${id}` : '/api/items'}>
      <ItemCreate id={id} isEdit={isEdit} />
    </Form>
  )
}
