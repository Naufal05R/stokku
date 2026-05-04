import { FileSpreadsheet, Lock, ShieldAlert, CreditCard } from 'lucide-react'

import { Card, CardContent } from '@/modules/common/components/ui'

const painPoints = [
  {
    icon: FileSpreadsheet,
    title: 'Stok berceceran di banyak file',
    description:
      'Data stok tersebar di spreadsheet yang berbeda-beda dan sering tidak sinkron antar anggota tim.',
  },
  {
    icon: Lock,
    title: 'Tidak ada kontrol akses',
    description:
      'Susah membedakan siapa yang boleh mengubah data dan siapa yang hanya boleh melihat laporan.',
  },
  {
    icon: ShieldAlert,
    title: 'Khawatir data bocor',
    description:
      'Menggunakan aplikasi inventaris online berarti data bisnis kamu tersimpan di server orang lain.',
  },
  {
    icon: CreditCard,
    title: 'Biaya langganan mahal',
    description:
      'Harus bayar bulanan untuk software yang fiturnya jauh lebih banyak dari yang benar-benar dipakai.',
  },
]

export function PainPointsSection() {
  return (
    <section className="bg-muted/30 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
            Kamu pernah merasakan ini?
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Masalah-masalah ini umum dialami bisnis yang masih mengandalkan cara lama untuk kelola
            stok.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {painPoints.map((item) => {
            const Icon = item.icon
            return (
              <Card key={item.title} className="gap-4 py-6">
                <CardContent className="flex flex-col gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                    <Icon size={20} className="text-destructive" />
                  </div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
