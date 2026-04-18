import { Suspense } from 'react'
import { History, LoaderCircle } from 'lucide-react'

import { DataTable } from '@/modules/common/components'
import { payload } from '@/lib/sdk'

import { columns } from './columns'

interface TransactionListProps {
  page: number
  limit: number
  search?: string
  sort?: string
  type?: string
}

const TransactionList = async ({ page, limit, search, sort, type }: TransactionListProps) => {
  const types = type ? type.split(',').filter(Boolean) : []

  const { docs, totalPages } = await payload.find({
    collection: 'transactions',
    limit,
    page,
    sort: sort?.includes('item') ? [`${sort}.name`] : sort,
    where: {
      and: [
        search
          ? {
              'item.name': {
                contains: search,
              },
            }
          : {},
        type
          ? {
              type: {
                in: types,
              },
            }
          : {},
      ],
    },
  })

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <DataTable
        columns={columns}
        data={docs}
        pageCount={totalPages}
        slug="transactions"
        label="Buat Transaksi"
      />
    </div>
  )
}

interface TransactionListPageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}

export const TransactionListPage = async (props: TransactionListPageProps) => {
  const searchParams = await props.searchParams
  const page = Number(searchParams?.page || 1)
  const limit = Number(searchParams?.limit || 10)
  const search = typeof searchParams?.search === 'string' ? searchParams.search : undefined
  const sort = typeof searchParams?.sort === 'string' ? searchParams.sort : undefined
  const type = typeof searchParams?.type === 'string' ? searchParams.type : undefined

  return (
    <div className="twp px-16 py-8 flex flex-col gap-8">
      <header className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <History className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Riwayat Transaksi</h1>
              <p className="text-muted-foreground text-base mt-1">
                Lihat riwayat transaksi barang.
              </p>
            </div>
          </div>
        </div>
      </header>

      <Suspense
        fallback={
          <div className="rounded-lg h-160 border border-border bg-card overflow-hidden flex items-center justify-center">
            <LoaderCircle className="animate-spin size-32 text-muted-foreground" />
          </div>
        }
      >
        <TransactionList page={page} limit={limit} search={search} sort={sort} type={type} />
      </Suspense>
    </div>
  )
}
