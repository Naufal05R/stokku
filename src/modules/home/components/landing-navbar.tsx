'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Box, Menu, X } from 'lucide-react'

import { cn } from '@/modules/common/utils'

import { DemoButton } from './demo-button'

const navLinks = [
  { label: 'Fitur', href: '#features' },
  { label: 'Instalasi', href: '#installation' },
  { label: 'Panduan', href: '#guideline' },
]

export function LandingNavbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
          <Box size={22} className="text-primary" />
          <span className="text-lg">Stokku</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <DemoButton size="sm">Live Demo</DemoButton>
        </div>

        <button
          className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        className={cn(
          'overflow-hidden bg-background transition-all duration-200 md:hidden',
          open ? 'max-h-64' : 'max-h-0',
        )}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="https://github.com/naufal05r/stokku"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            GitHub
          </Link>
          <div className="pt-2">
            <DemoButton size="sm" className="w-full" onClick={() => setOpen(false)}>
              Live Demo
            </DemoButton>
          </div>
        </nav>
      </div>
    </header>
  )
}
