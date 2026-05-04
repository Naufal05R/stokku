import { ArrowRight, Download } from 'lucide-react'

import { Button } from '@/modules/common/components/ui'
import { Badge } from '@/modules/common/components/ui'

import { DashboardMockup } from './dashboard-mockup'
import { DemoButton } from './demo-button'

export function HeroSection() {
  return (
    <section className="bg-linear-to-b from-background to-muted/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Open Source</Badge>
              <Badge variant="secondary">Gratis Selamanya</Badge>
              <Badge variant="secondary">Self-Hosted</Badge>
            </div>

            <h1 className="text-4xl leading-tight font-bold tracking-tight text-foreground md:text-5xl">
              Kelola stok bisnis kamu tanpa langganan bulanan
            </h1>

            <p className="text-lg text-muted-foreground">
              Stokku adalah aplikasi manajemen inventaris yang bisa kamu pasang sendiri. Tidak perlu
              berlangganan, tidak ada data yang pergi ke server orang lain.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a
                  href="https://github.com/naufal05r/stokku/raw/main/docker-compose.yml"
                  download
                >
                  <Download />
                  Download Docker Compose
                </a>
              </Button>
              <DemoButton variant="outline" size="lg">
                Lihat Demo
                <ArrowRight />
              </DemoButton>
            </div>

            <p className="text-sm text-muted-foreground">
              Gratis selamanya · Data tetap milikmu · Open source
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  )
}
