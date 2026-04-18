import type { Item } from '@/payload-types'

import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

import { buttonVariants } from '@/modules/common/components/ui/button'
import { Badge } from '@/modules/common/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/modules/common/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/modules/common/components/ui/table'

export interface CriticalStockListProps {
  items: Item[]
}

export function CriticalStockList({ items }: CriticalStockListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-destructive">Stok Kritis</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">Semua stok aman.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kode</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Sisa</TableHead>
                <TableHead>Min.</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.code}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <Badge variant="destructive">{item.quantity}</Badge>
                  </TableCell>
                  <TableCell>{item.minQuantity}</TableCell>
                  <TableCell className="text-center">
                    <Link
                      href={`/admin/collections/items/${item.id}`}
                      className={buttonVariants({ variant: 'link' })}
                    >
                      <ExternalLink />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
