import Link from 'next/link'
import { Download, ArrowRight } from 'lucide-react'

import { Button } from '@/modules/common/components/ui'

export function CtaSection() {
  return (
    <section className="bg-primary/5 py-20">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
          Siap kelola inventaris lebih rapi?
        </h2>
        <p className="mx-auto mb-8 max-w-lg text-muted-foreground">
          Mulai gratis hari ini — tidak perlu kartu kredit, tidak perlu akun cloud.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <a
              href="https://github.com/naufal05r/stokku/raw/main/docker-compose.yml"
              download
            >
              <Download />
              Download Docker Compose
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/admin">
              Lihat Demo
              <ArrowRight />
            </Link>
          </Button>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Gratis selamanya · Data tetap milikmu · Open source
        </p>
      </div>
    </section>
  )
}
