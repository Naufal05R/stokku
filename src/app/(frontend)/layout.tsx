import type { ReactNode } from 'react'

import '@/styles/global.css'

export const metadata = {
  description:
    'Stokku — aplikasi manajemen inventaris gratis dan open source yang bisa kamu pasang sendiri.',
  title: 'Stokku — Kelola Stok Bisnis Tanpa Langganan',
}

interface RootLayoutProps {
  children: ReactNode
}

export default async function RootLayout(props: RootLayoutProps) {
  const { children } = props

  return (
    <html lang="id" className="scroll-smooth">
      <body>{children}</body>
    </html>
  )
}
