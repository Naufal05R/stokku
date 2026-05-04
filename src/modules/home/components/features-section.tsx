import { Package, ArrowLeftRight, LayoutDashboard, ShieldCheck, SunMoon, Sparkles } from 'lucide-react'

import { Card, CardContent } from '@/modules/common/components/ui'

const features = [
  {
    icon: Package,
    title: 'Kelola Data Produk dengan Mudah',
    description:
      'Tambah, edit, dan hapus data barang kapan saja. Lengkap dengan kategori dan informasi stok.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Catat Setiap Pergerakan Stok',
    description:
      'Rekam transaksi masuk dan keluar secara rapi. Riwayat tersimpan otomatis dan bisa ditelusuri kapan saja.',
  },
  {
    icon: LayoutDashboard,
    title: 'Ringkasan Inventaris Sekilas',
    description:
      'Lihat kondisi stok keseluruhan dalam satu tampilan yang mudah dibaca tanpa harus buka banyak halaman.',
  },
  {
    icon: ShieldCheck,
    title: 'Kontrol Siapa yang Bisa Apa',
    description:
      'Admin punya akses penuh untuk mengubah data. Anggota tim dengan role Guest hanya bisa melihat tanpa mengubah.',
  },
  {
    icon: Sparkles,
    title: 'Antarmuka Bersih & Intuitif',
    description:
      'Desain minimalis yang tidak membingungkan. Navigasi langsung paham tanpa perlu baca panduan terlebih dahulu.',
  },
  {
    icon: SunMoon,
    title: 'Nyaman di Mata, Kapan Saja',
    description:
      'Pilih tampilan terang atau gelap sesuai preferensi. Tersedia toggle tema langsung dari panel aplikasi.',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
            Semua yang kamu butuhkan untuk kelola stok
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Fitur yang tepat sasaran — tidak berlebihan, tidak kurang. Dibuat untuk tim yang ingin
            langsung pakai tanpa perlu pelatihan panjang.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className="gap-4 py-6"
              >
                <CardContent className="flex flex-col gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
