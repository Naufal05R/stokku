import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import { Form } from '@payloadcms/ui'

import { payload } from '@/lib/sdk'

import { CreateTransactionForm } from '../components/create-transaction-form'
import { TransactionView } from '../components/transaction-view'

interface TransactionDetailPageProps {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const TransactionDetailPage = async ({ params }: TransactionDetailPageProps) => {
  const { segments } = await params
  const id = Array.isArray(segments) && segments.length > 2 ? segments[2] : undefined
  const isView = !!id && id !== 'create'

  if (isView) {
    return (
      <Suspense
        fallback={
          <div className="flex h-96 w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        }
      >
        <TransactionView id={id} />
      </Suspense>
    )
  } else {
    const { docs } = await payload.find({
      collection: 'items',
      pagination: false,
      limit: 0,
    })

    const items = docs.map((doc) => ({
      id: String(doc.id),
      name: doc.name || String(doc.id),
      quantity: doc.quantity || 0,
    }))

    return (
      <Form method="POST" action="/api/transactions">
        <CreateTransactionForm items={items} />
      </Form>
    )
  }
}
