import { ArrowRight } from 'lucide-react'

import { DashboardMockup } from './dashboard-mockup'
import { ItemsMockup } from './items-mockup'
import { TransactionMockup } from './transaction-mockup'

import { DemoButton } from './demo-button'

const tabs = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    caption: 'Pantau kondisi stok, aktivitas, dan peringatan stok kritis sekilas',
    Component: DashboardMockup,
  },
  {
    id: 'items',
    label: 'Daftar Barang',
    caption: 'Kelola semua produk, filter berdasarkan kategori, dan pantau stok secara real-time',
    Component: ItemsMockup,
  },
  {
    id: 'transaction',
    label: 'Buat Transaksi',
    caption: 'Catat stok masuk, keluar, dan lakukan stock opname dalam satu halaman',
    Component: TransactionMockup,
  },
]

export function ScreenshotsSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
            Lihat sebelum mencoba
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Tampilan yang bersih dan mudah dipahami — dirancang untuk pengguna bisnis, bukan hanya
            developer.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {tabs.map(({ id, label, caption, Component }) => (
            <div key={id} className="flex flex-col gap-3">
              <Component />
              <div>
                <p className="font-medium text-foreground">{label}</p>
                <p className="text-sm text-muted-foreground">{caption}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <DemoButton>
            Coba Demo Langsung
            <ArrowRight />
          </DemoButton>
        </div>
      </div>
    </section>
  )
}
