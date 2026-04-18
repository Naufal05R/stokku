import { Suspense } from 'react'
import { LoaderCircle } from 'lucide-react'

import { ItemList } from '../components/item-list'

import { ItemListTemplate } from './item-list-template'

interface ItemListPageProps {
  page: number
  limit: number
  search?: string
  sort?: string
  category?: string
  unit?: string
}

export const ItemListPage = async ({
  page,
  limit,
  search,
  sort,
  category,
  unit,
}: ItemListPageProps) => {
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
          page={page}
          limit={limit}
          search={search}
          sort={sort}
          category={category}
          unit={unit}
        />
      </Suspense>
    </ItemListTemplate>
  )
}
