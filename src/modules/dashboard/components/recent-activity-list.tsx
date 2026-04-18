import type { Item, Transaction } from '@/payload-types'

import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'

import { Badge } from '@/modules/common/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/modules/common/components/ui/card'

export interface RecentActivityListProps {
  transactions: Transaction[]
}

export function RecentActivityList({ transactions }: RecentActivityListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aktivitas Terkini</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <p className="text-sm text-muted-foreground">Belum ada transaksi.</p>
          ) : (
            transactions.map((trx) => {
              const isInbound = trx.type === 'inbound'
              const item = trx.item as Item

              return (
                <div
                  key={trx.id}
                  className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full ${
                        isInbound ? 'bg-primary/10' : 'bg-destructive/10'
                      }`}
                    >
                      {isInbound ? (
                        <ArrowDownLeft className="h-5 w-5 text-primary" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 text-destructive" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {item.name || 'Unknown Item'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(trx.createdAt).toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={isInbound ? 'default' : 'destructive'}>
                      {isInbound ? '+' : '-'} {trx.quantity}
                    </Badge>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
