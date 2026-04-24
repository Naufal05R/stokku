'use client'

import type { User } from '@/payload-types'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Save } from 'lucide-react'

import { useAuth, useField, useForm } from '@payloadcms/ui'

import { ITEM_CATEGORY_OPTIONS, ITEM_UNIT_OPTIONS } from '../constants'
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/modules/common/components'

export const ItemCreate = ({ id, isEdit }: { id?: string; isEdit: boolean }) => {
  const { submit } = useForm()
  const { user } = useAuth<User>()
  const router = useRouter()

  const isAdmin = user?.role === 'admin'

  const { value: code, setValue: setCode } = useField<string>({ path: 'code' })
  const { value: name, setValue: setName } = useField<string>({ path: 'name' })
  const { value: category, setValue: setCategory } = useField<string>({ path: 'category' })
  const { value: unit, setValue: setUnit } = useField<string>({ path: 'unit' })
  const { value: quantity, setValue: setQuantity } = useField<number>({ path: 'quantity' })
  const { value: minQuantity, setValue: setMinQuantity } = useField<number>({ path: 'minQuantity' })
  const { value: position, setValue: setPosition } = useField<string>({ path: 'position' })

  useEffect(() => {
    if (isEdit && id) {
      const fetchItem = async () => {
        try {
          const res = await fetch(`/api/items/${id}`)
          if (!res.ok) throw new Error('Failed to fetch item')
          const data = await res.json()

          setCode(data.code)
          setName(data.name)
          setCategory(data.category)
          setUnit(data.unit)
          setQuantity(data.quantity)
          setMinQuantity(data.minQuantity)
          setPosition(data.position)
        } catch (error) {
          console.error('Error fetching item:', error)
        }
      }
      fetchItem()
    }
  }, [id, isEdit, setCode, setName, setCategory, setUnit, setQuantity, setMinQuantity, setPosition])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await submit()
      router.push('/admin/collections/items')
      router.refresh()
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <div className="twp text-foreground py-8 px-16 space-y-10">
      <section className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="grid grid-cols-6 items-start content-start gap-4">
            <h3 className="col-span-6 text-lg font-medium">Informasi Barang</h3>

            <div className="col-span-6 space-y-2">
              <Label htmlFor="name">
                Nama Barang <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Contoh: Laptop Gaming"
                value={name || ''}
                onChange={(e) => setName(e.target.value)}
                disabled={!isAdmin}
              />
            </div>

            <div className="col-span-6 sm:col-span-2 md:col-span-6 xl:col-span-2 space-y-2">
              <Label htmlFor="code">
                Kode Barang (SKU) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="code"
                placeholder="Contoh: BRG-001"
                value={code || ''}
                onChange={(e) => setCode(e.target.value)}
                disabled={!isAdmin}
              />
            </div>

            <div className="col-span-3 sm:col-span-2 md:col-span-3 xl:col-span-2 space-y-2">
              <Label>Kategori</Label>
              <Select value={category || ''} onValueChange={setCategory} disabled={!isAdmin}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {ITEM_CATEGORY_OPTIONS.map(({ label, value }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-3 sm:col-span-2 md:col-span-3 xl:col-span-2 space-y-2">
              <Label>
                Satuan (UoM) <span className="text-destructive">*</span>
              </Label>
              <Select value={unit || ''} onValueChange={setUnit} disabled={!isAdmin}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih satuan" />
                </SelectTrigger>
                <SelectContent>
                  {ITEM_UNIT_OPTIONS.map(({ label, value }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 items-start content-start gap-4">
            <h3 className="col-span-2 text-lg font-medium">Inventaris & Lokasi</h3>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="position">Posisi Rak</Label>
              <Input
                id="position"
                placeholder="Contoh: Rak A-01"
                value={position || ''}
                onChange={(e) => setPosition(e.target.value)}
                disabled={!isAdmin}
              />
            </div>

            <div className="col-span-1 space-y-2">
              <Label htmlFor="quantity">Stok Saat Ini</Label>
              <Input id="quantity" type="number" placeholder="0" value={quantity ?? ''} disabled />
              <p className="text-xs text-muted-foreground">
                Stok hanya bisa diubah lewat transaksi
              </p>
            </div>

            <div className="col-span-1 space-y-2">
              <Label htmlFor="minQuantity">Stok Minimum</Label>
              <Input
                id="minQuantity"
                type="number"
                placeholder="0"
                value={minQuantity ?? ''}
                onChange={(e) => setMinQuantity(Number(e.target.value))}
                disabled={!isAdmin}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="button" onClick={handleSubmit} disabled={!isAdmin}>
            <Save className="mr-2 h-4 w-4" /> {isEdit ? 'Simpan Perubahan' : 'Simpan Barang'}
          </Button>
        </div>
      </section>
    </div>
  )
}
