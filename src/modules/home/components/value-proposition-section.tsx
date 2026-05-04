import { BadgeCheck } from 'lucide-react'

const values = [
  {
    title: 'Gratis Selamanya',
    description:
      'Tidak ada biaya langganan, tidak ada fitur yang dikunci di balik paywall. Unduh, pasang, dan pakai — selesai.',
  },
  {
    title: 'Data Tetap di Tanganmu',
    description:
      'Self-hosted berarti semua data tersimpan di server atau komputer kamu sendiri. Tidak ada pihak ketiga yang bisa mengaksesnya.',
  },
  {
    title: 'Multi-user dengan Kontrol Akses',
    description:
      'Role Admin dan Guest sudah tersedia sejak awal. Cocok untuk tim kecil hingga menengah yang butuh pembagian hak akses.',
  },
  {
    title: 'Berjalan di Browser, Diakses dari Mana Saja',
    description:
      'Karena berbasis web, seluruh tim bisa mengakses Stokku dari perangkat apa pun dalam jaringan yang sama.',
  },
  {
    title: 'Open Source & Transparan',
    description:
      'Kode bisa dilihat dan diaudit oleh siapa pun. Tidak ada yang tersembunyi — kamu tahu persis apa yang berjalan di servermu.',
  },
]

export function ValuePropositionSection() {
  return (
    <section className="bg-muted/30 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground">
              Kenapa Stokku?
            </h2>
            <p className="text-muted-foreground">
              Banyak software inventaris yang bagus — tapi hampir semuanya minta kamu bayar,
              menyimpan datamu di cloud mereka, atau keduanya. Stokku tidak.
            </p>
          </div>

          <ul className="flex flex-col gap-4">
            {values.map((item) => (
              <li key={item.title} className="flex gap-3">
                <BadgeCheck size={20} className="mt-0.5 shrink-0 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
