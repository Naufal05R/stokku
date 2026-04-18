'use client'

import { Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

import { InputWithStartIcon } from '../ui'

export const DataTableHeaderSearchBar = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(window.location.search)
    if (term) {
      params.set('search', term)
    } else {
      params.delete('search')
    }
    params.set('page', '1')
    router.replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <InputWithStartIcon
      Icon={Search}
      placeholder="Cari barang..."
      defaultValue={searchParams.get('search')?.toString()}
      onChange={(event) => handleSearch(event.target.value)}
      className="w-full lg:max-w-sm"
    />
  )
}
