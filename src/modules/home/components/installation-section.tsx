import { CheckSquare, Download, Settings, Terminal, Globe } from 'lucide-react'

import { Separator } from '@/modules/common/components/ui'

const steps = [
  {
    icon: Download,
    number: '01',
    title: 'Install Docker Desktop',
    description:
      'Unduh dan install seperti aplikasi biasa. Klik Next terus sampai selesai. Tersedia untuk Windows, macOS, dan Linux.',
    action: {
      label: 'Download Docker Desktop',
      href: 'https://www.docker.com/products/docker-desktop/',
    },
  },
  {
    icon: Download,
    number: '02',
    title: 'Download file Compose Stokku',
    description:
      'Unduh satu file konfigurasi. Tidak perlu mengedit kode apa pun.',
    action: {
      label: 'Download docker-compose.yml',
      href: 'https://github.com/naufal05r/stokku/raw/main/docker-compose.yml',
    },
  },
  {
    icon: Settings,
    number: '03',
    title: 'Isi konfigurasi awal',
    description:
      'Unduh juga file .env.example, ganti namanya menjadi .env, lalu isi tiga hal: password database, email Admin, dan password Admin. Hanya isi teks biasa — tidak ada coding.',
    code: null,
  },
  {
    icon: Terminal,
    number: '04',
    title: 'Jalankan Stokku',
    description:
      'Buka terminal atau command prompt, arahkan ke folder tadi, lalu jalankan perintah berikut. Tunggu beberapa menit saat pertama kali — database akan ter-setup otomatis.',
    code: 'docker compose up -d',
  },
  {
    icon: Globe,
    number: '05',
    title: 'Buka di Browser',
    description:
      'Buka http://localhost:3000 — Stokku sudah siap digunakan. Login dengan email dan password Admin yang kamu isi di langkah sebelumnya.',
    code: null,
  },
]

const faqs = [
  {
    q: 'Apakah saya perlu tahu coding atau Docker?',
    a: 'Tidak. Cukup bisa copy-paste dan isi teks di file konfigurasi.',
  },
  {
    q: 'Apakah data inventaris saya aman?',
    a: 'Ya. Semua data tersimpan di database di komputer atau server kamu sendiri, tidak dikirim ke mana pun.',
  },
  {
    q: 'Bisakah seluruh tim mengakses Stokku?',
    a: 'Bisa. Karena berbasis web, siapa pun dalam jaringan yang sama bisa membuka Stokku dari browser masing-masing.',
  },
  {
    q: 'Bagaimana membedakan akses Admin dan staf biasa?',
    a: 'Stokku punya dua role: Admin (akses penuh) dan Guest (hanya lihat data).',
  },
  {
    q: 'Bagaimana kalau ada error saat instalasi?',
    a: 'Cek panduan troubleshooting di GitHub, atau buka Issue di repositori Stokku untuk bantuan dari komunitas.',
  },
]

export function InstallationSection() {
  return (
    <section id="installation" className="bg-muted/30 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-4 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
            Cara memasang Stokku
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Lima langkah sederhana. Tidak perlu keahlian teknis khusus.
          </p>
        </div>

        {/* Prerequisite */}
        <div className="mx-auto mb-10 max-w-2xl rounded-xl border border-border bg-background p-5">
          <p className="mb-3 font-semibold text-foreground">Sebelum mulai, pastikan kamu sudah punya:</p>
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-2">
              <CheckSquare size={16} className="mt-0.5 shrink-0 text-primary" />
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Docker Desktop</span> — gratis,
                tersedia untuk Windows, macOS, dan Linux
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckSquare size={16} className="mt-0.5 shrink-0 text-primary" />
              <p className="text-sm text-muted-foreground">
                Koneksi internet — hanya dibutuhkan saat instalasi pertama
              </p>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="mx-auto mb-16 max-w-2xl">
          <ol className="flex flex-col gap-0">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <li key={step.number} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {step.number}
                    </div>
                    {i < steps.length - 1 && <div className="w-px flex-1 bg-border" />}
                  </div>
                  <div className={`pb-8 pt-1.5 ${i === steps.length - 1 ? 'pb-0' : ''}`}>
                    <div className="mb-1 flex items-center gap-2">
                      <Icon size={16} className="text-primary" />
                      <h3 className="font-semibold text-foreground">{step.title}</h3>
                    </div>
                    <p className="mb-2 text-sm text-muted-foreground">{step.description}</p>
                    {step.action && (
                      <a
                        href={step.action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                        {...(step.action.href.startsWith('https://github.com') ? { download: true } : {})}
                      >
                        <Download size={14} />
                        {step.action.label}
                      </a>
                    )}
                    {step.code && (
                      <div className="mt-2 flex items-center gap-2 rounded-lg bg-foreground/5 px-4 py-2 font-mono text-sm">
                        <span className="text-primary">$</span>
                        <span className="text-foreground">{step.code}</span>
                      </div>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        <Separator className="mb-16" />

        {/* FAQ */}
        <div className="mx-auto max-w-2xl">
          <h3 className="mb-6 text-xl font-bold text-foreground">Pertanyaan yang sering muncul</h3>
          <div className="flex flex-col gap-5">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <p className="mb-1 font-medium text-foreground">{faq.q}</p>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
