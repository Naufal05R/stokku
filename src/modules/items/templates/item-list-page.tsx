import type { DocumentViewServerProps } from 'payload'

import { Suspense } from 'react'
import { LoaderCircle } from 'lucide-react'

import { ItemList } from '../components/item-list'

import { ItemListTemplate } from './item-list-template'

const isString = (value: unknown): value is string => typeof value === 'string'

export const ItemListPage = async ({ searchParams }: DocumentViewServerProps) => {
  const page = Number(searchParams?.page || 1)
  const limit = Number(searchParams?.limit || 10)
  const search = typeof searchParams?.search === 'string' ? searchParams.search : undefined
  const sort = typeof searchParams?.sort === 'string' ? searchParams.sort : undefined
  const category = typeof searchParams?.category === 'string' ? searchParams.category : undefined
  const unit = typeof searchParams?.unit === 'string' ? searchParams.unit : undefined

  return (
    <ItemListTemplate>
      <Suspense
        fallback={
          <div className="rounded-lg h-160 border border-border bg-card overflow-hidden flex items-center justify-center">
            <LoaderCircle className="animate-spin size-32 text-muted-foreground" />
          </div>
        }
      >
        <ItemList
          page={Number(page || 1)}
          limit={Number(limit || 10)}
          search={isString(search) ? search : undefined}
          sort={isString(sort) ? sort : undefined}
          category={isString(category) ? category : undefined}
          unit={isString(unit) ? unit : undefined}
        />
      </Suspense>
    </ItemListTemplate>
  )
}
