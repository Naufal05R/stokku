import Link from 'next/link'
import { FileQuestion } from 'lucide-react'

import { Button } from '@/modules/common/components'

export const NotFoundPage = () => {
  return (
    <section className="twp flex h-screen flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 rounded-full bg-muted p-8">
        <FileQuestion className="h-16 w-16 text-muted-foreground" />
      </div>
      <h1 className="mb-2 text-4xl font-bold tracking-tight">404</h1>
      <h2 className="mb-6 text-xl font-semibold text-muted-foreground">Halaman Tidak Ditemukan</h2>
      <p className="mb-8 max-w-md text-muted-foreground">
        Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman telah dipindahkan atau
        dihapus.
      </p>
      <Link href="/admin">
        <Button size="lg">Kembali ke Dashboard</Button>
      </Link>
    </section>
  )
}
