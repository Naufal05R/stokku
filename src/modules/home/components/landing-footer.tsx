import Link from 'next/link'
import { Box, GitFork } from 'lucide-react'

import { Separator } from '@/modules/common/components/ui'

const footerLinks = [
  {
    label: 'Repository',
    href: 'https://github.com/naufal05r/stokku',
    external: true,
  },
  {
    label: 'Issues',
    href: 'https://github.com/naufal05r/stokku/issues',
    external: true,
  },
]

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
              <Box size={20} className="text-primary" />
              <span>Stokku</span>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              Aplikasi manajemen inventaris gratis dan open source yang bisa kamu pasang sendiri.
            </p>
            <a
              href="https://github.com/naufal05r/stokku"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <GitFork size={12} />
              Open Source
            </a>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-2">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Links
            </p>
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Docs */}
          <nav className="flex flex-col gap-2">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Docs
            </p>
            {[
              { label: 'Next.js', href: 'https://nextjs.org/docs' },
              { label: 'Payload CMS', href: 'https://payloadcms.com/docs' },
              { label: 'PostgreSQL', href: 'https://www.postgresql.org/docs/' },
              { label: 'TypeScript', href: 'https://www.typescriptlang.org/docs/' },
            ].map((doc) => (
              <a
                key={doc.label}
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {doc.label}
              </a>
            ))}
          </nav>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} All Rights Reserved. Software Built by{' '}
            <a
              href="https://naufalrabbani.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary transition-colors hover:underline"
            >
              Naufal Rabbani
            </a>{' '}
            under MIT License.
          </p>
        </div>
      </div>
    </footer>
  )
}
