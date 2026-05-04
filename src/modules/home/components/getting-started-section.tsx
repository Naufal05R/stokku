import Link from 'next/link'
import { CheckCircle2, ExternalLink } from 'lucide-react'

import { Button } from '@/modules/common/components/ui'

const steps = [
  {
    step: 1,
    title: 'Login sebagai Admin',
    description: 'Buka /admin/login, gunakan email & password yang kamu set saat konfigurasi.',
  },
  {
    step: 2,
    title: 'Tambahkan data barang pertama',
    description: 'Masuk ke menu Barang → klik Tambah Barang → isi nama, kategori, dan stok awal.',
  },
  {
    step: 3,
    title: 'Catat transaksi pertama',
    description: 'Masuk ke menu Transaksi → pilih jenis → pilih barang → simpan.',
  },
  {
    step: 4,
    title: 'Cek Dashboard',
    description: 'Lihat ringkasan kondisi inventaris kamu secara keseluruhan.',
  },
]

export function GettingStartedSection() {
  return (
    <section id="guideline" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground">
              Langkah pertama setelah instalasi
            </h2>
            <p className="mb-6 text-muted-foreground">
              Setelah Stokku berjalan, ini yang perlu kamu lakukan untuk mulai mencatat inventaris.
            </p>
          </div>

          <ol className="flex flex-col gap-4">
            {steps.map((item) => (
              <li key={item.step} className="flex gap-3">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-primary" />
                <div>
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
