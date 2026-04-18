import Link from 'next/link'
import { ArrowDownLeft, ArrowUpRight, Plus } from 'lucide-react'

import { Button } from '@/modules/common/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/modules/common/components/ui/card'

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aksi Cepat</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <Button asChild className="w-full" variant="default">
          <Link href="/admin/collections/transactions/create?type=inbound">
            <ArrowDownLeft className="mr-2 h-4 w-4" />
            Terima Barang Masuk
          </Link>
        </Button>
        <Button asChild className="w-full" variant="destructive">
          <Link href="/admin/collections/transactions/create?type=outbound">
            Catat Barang Keluar
            <ArrowUpRight className="mr-2 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild className="w-full md:col-span-2" variant="outline">
          <Link href="/admin/collections/items/create">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Daftar Barang
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
