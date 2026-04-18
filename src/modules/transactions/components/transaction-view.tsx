import { Card, CardContent, CardHeader, CardTitle } from '@/modules/common/components/ui/card'
import { Input } from '@/modules/common/components/ui/input'
import { Label } from '@/modules/common/components/ui/label'
import { Textarea } from '@/modules/common/components/ui/textarea'

import { retrieveTransactionById } from '../repositories/transactions'

interface TransactionViewProps {
  id: string | number
}

export const TransactionView = async ({ id }: TransactionViewProps) => {
  const transaction = await retrieveTransactionById(id)

  return (
    <div className="twp text-foreground py-8 px-16 space-y-10">
      <section className="space-y-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Detail Transaksi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tipe Transaksi</Label>
                <Input
                  disabled
                  defaultValue={transaction.type === 'inbound' ? 'Barang Masuk' : 'Barang Keluar'}
                  className="bg-muted capitalize"
                />
              </div>
              <div className="space-y-2">
                <Label>Barang</Label>
                <Input defaultValue={transaction.item?.name || '-'} disabled className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>Jumlah</Label>
                <Input defaultValue={transaction.quantity} disabled className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>Tanggal</Label>
                <Input
                  defaultValue={new Date(transaction.createdAt).toLocaleString('id-ID')}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Catatan</Label>
                <Textarea
                  defaultValue={transaction.note || '-'}
                  disabled
                  className="bg-muted resize-none"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
