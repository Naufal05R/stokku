import { notFound } from 'next/navigation'

import { payload } from '@/lib/sdk'
import { isPopulated } from '@/modules/common/guards'

export const retrieveTransactionById = async (id: string | number) => {
  const transaction = await payload.findByID({
    collection: 'transactions',
    id,
    depth: 1,
  })

  if (isPopulated(transaction, 'item')) return transaction

  notFound()
}
