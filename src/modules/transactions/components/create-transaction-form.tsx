'use client'

import { useState } from 'react'
import { PencilLine, Save } from 'lucide-react'

import { useField, useForm } from '@payloadcms/ui'

import { Button } from '@/modules/common/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/modules/common/components/ui/card'
import { Input } from '@/modules/common/components/ui/input'
import { Label } from '@/modules/common/components/ui/label'
import { Textarea } from '@/modules/common/components/ui/textarea'

import { TransactionItemSelector } from './transaction-item-selector'

interface CreateTransactionFormProps {
  items: { id: string; name: string; quantity: number }[]
}

export const CreateTransactionForm = ({ items }: CreateTransactionFormProps) => {
  const { submit } = useForm()

  const { setValue: setPathItem } = useField<number>({ path: 'item' })
  const { setValue: setPathType } = useField<string>({ path: 'type' })
  const { setValue: setPathQty } = useField<number>({ path: 'quantity' })
  const { setValue: setPathNote } = useField<string>({ path: 'note' })

  const [selectedInbound, setSelectedInbound] = useState({ id: '', qty: 0, note: '' })
  const [selectedOutbound, setSelectedOutbound] = useState({ id: '', qty: 0, note: '' })
  const [selectedOpname, setSelectedOpname] = useState({
    id: '',
    physical: 0,
    recorded: 0,
    note: '',
  })

  const [openMasuk, setOpenMasuk] = useState(false)
  const [openKeluar, setOpenKeluar] = useState(false)
  const [openOpname, setOpenOpname] = useState(false)

  const executeSubmit = (item: string, type: 'inbound' | 'outbound', qty: number, note: string) => {
    setPathItem(Number(item))
    setPathType(type)
    setPathQty(qty)
    setPathNote(note)

    setTimeout(() => {
      submit()
    }, 100)
  }

  const handleOpnameSubmit = () => {
    if (!selectedOpname.id) return

    const diff = selectedOpname.physical - selectedOpname.recorded
    if (diff === 0) return

    const type = diff > 0 ? 'inbound' : 'outbound'
    const finalQty = Math.abs(diff)
    const finalNote = selectedOpname.note

    executeSubmit(selectedOpname.id, type, finalQty, finalNote)
  }

  return (
    <div className="twp text-foreground py-8 px-16 space-y-10">
      <section className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Barang Masuk</h3>
            <div className="space-y-2">
              <Label>Pilih Barang</Label>
              <TransactionItemSelector
                open={openMasuk}
                setOpen={setOpenMasuk}
                value={selectedInbound.id}
                onChange={(id) => setSelectedInbound({ ...selectedInbound, id })}
                placeholder="Pilih barang untuk masuk..."
                items={items}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qty-masuk">Qty Masuk</Label>
              <Input
                id="qty-masuk"
                type="number"
                value={selectedInbound.qty || ''}
                onChange={(e) =>
                  setSelectedInbound({ ...selectedInbound, qty: Number(e.target.value) })
                }
                placeholder="24"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inbound-note">Catatan (opsional)</Label>
              <Textarea
                id="inbound-note"
                className="min-h-25 resize-none"
                value={selectedInbound.note}
                onChange={(e) => setSelectedInbound({ ...selectedInbound, note: e.target.value })}
                placeholder="Contoh: Kiriman dari Jakarta..."
              />
            </div>
            <Button
              type="button"
              onClick={() =>
                executeSubmit(
                  selectedInbound.id,
                  'inbound',
                  selectedInbound.qty,
                  selectedInbound.note,
                )
              }
            >
              <PencilLine className="mr-2 h-4 w-4" /> Catat Barang Masuk
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Barang Keluar</h3>
            <div className="space-y-2">
              <Label>Pilih Barang</Label>
              <TransactionItemSelector
                open={openKeluar}
                setOpen={setOpenKeluar}
                value={selectedOutbound.id}
                onChange={(id) => setSelectedOutbound({ ...selectedOutbound, id })}
                placeholder="Pilih barang untuk keluar..."
                items={items}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qty-keluar">Qty Keluar</Label>
              <Input
                id="qty-keluar"
                type="number"
                value={selectedOutbound.qty || ''}
                onChange={(e) =>
                  setSelectedOutbound({ ...selectedOutbound, qty: Number(e.target.value) })
                }
                placeholder="Jumlah keluar"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="outbound-note">Catatan (opsional)</Label>
              <Textarea
                id="outbound-note"
                className="min-h-25 resize-none"
                value={selectedOutbound.note}
                onChange={(e) => setSelectedOutbound({ ...selectedOutbound, note: e.target.value })}
                placeholder="Contoh: Pengiriman ke Jakarta..."
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              onClick={() =>
                executeSubmit(
                  selectedOutbound.id,
                  'outbound',
                  selectedOutbound.qty,
                  selectedOutbound.note,
                )
              }
            >
              <PencilLine className="mr-2 h-4 w-4" /> Catat Barang Keluar
            </Button>
          </div>
        </div>
      </section>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Penyesuaian / Stock Opname</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Pilih Barang</Label>
              <TransactionItemSelector
                open={openOpname}
                setOpen={setOpenOpname}
                value={selectedOpname.id}
                onChange={(id, recorded) => setSelectedOpname({ ...selectedOpname, id, recorded })}
                placeholder="Pilih barang..."
                items={items}
              />
            </div>
            <div className="space-y-2">
              <Label>Stok tercatat</Label>
              <Input
                value={selectedOpname.id ? selectedOpname.recorded : '-'}
                disabled
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label>Stok fisik</Label>
              <Input
                type="number"
                value={selectedOpname.physical || ''}
                onChange={(e) =>
                  setSelectedOpname({ ...selectedOpname, physical: Number(e.target.value) })
                }
                placeholder="Isi hasil hitung fisik..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Catatan (opsional)</Label>
            <Textarea
              className="min-h-25 resize-none"
              value={selectedOpname.note}
              onChange={(e) => setSelectedOpname({ ...selectedOpname, note: e.target.value })}
              placeholder="Contoh: Opname akhir bulan..."
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-xs">
              {selectedOpname.id && selectedOpname.physical !== selectedOpname.recorded && (
                <p className="text-muted-foreground">
                  Akan dicatat sebagai transaksi:{' '}
                  <span className="font-bold text-foreground">
                    {selectedOpname.physical > selectedOpname.recorded ? 'INBOUND' : 'OUTBOUND'}(
                    {Math.abs(selectedOpname.physical - selectedOpname.recorded)})
                  </span>
                </p>
              )}
            </div>
            <Button type="button" variant="outline" onClick={handleOpnameSubmit}>
              <Save className="mr-2 h-4 w-4" />
              Simpan Penyesuaian
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
