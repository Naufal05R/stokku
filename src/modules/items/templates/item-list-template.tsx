import type { PropsWithChildren } from 'react'

import { Package } from 'lucide-react'

export const ItemListTemplate = ({ children }: PropsWithChildren) => {
  return (
    <div className="twp px-16 py-8 flex flex-col gap-8">
      <header className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Package className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Master Barang</h1>
              <p className="text-muted-foreground text-base mt-1">
                Lihat stok. Kelola data barang.
              </p>
            </div>
          </div>
        </div>
      </header>

      {children}
    </div>
  )
}
