import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import '@/styles/global.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stokku.naufalrabbani.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Stokku — Kelola Stok Bisnis Tanpa Langganan',
    template: '%s | Stokku',
  },
  description:
    'Stokku adalah aplikasi manajemen inventaris gratis, open source, dan self-hosted. Tidak perlu berlangganan — data stok bisnis kamu tetap di tanganmu sendiri.',
  keywords: [
    'manajemen inventaris',
    'aplikasi stok barang',
    'self-hosted',
    'open source',
    'gratis',
    'aplikasi gudang',
    'kelola stok',
    'inventaris bisnis',
  ],
  authors: [{ name: 'Naufal Rabbani', url: 'https://naufalrabbani.com' }],
  creator: 'Naufal Rabbani',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: siteUrl,
    siteName: 'Stokku',
    title: 'Stokku — Kelola Stok Bisnis Tanpa Langganan',
    description:
      'Aplikasi manajemen inventaris gratis, open source, dan self-hosted. Kontrol penuh atas data stok bisnis kamu.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Stokku — Dashboard manajemen inventaris self-hosted',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stokku — Kelola Stok Bisnis Tanpa Langganan',
    description:
      'Aplikasi manajemen inventaris gratis, open source, dan self-hosted. Kontrol penuh atas data stok bisnis kamu.',
    images: ['/og-image.png'],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Stokku',
      description:
        'Aplikasi manajemen inventaris gratis, open source, dan self-hosted.',
      inLanguage: 'id-ID',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${siteUrl}/#software`,
      name: 'Stokku',
      description:
        'Aplikasi manajemen inventaris gratis, open source, dan self-hosted. Tidak perlu berlangganan — data stok bisnis kamu tetap di tanganmu sendiri.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      inLanguage: 'id-ID',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'IDR',
      },
      featureList: [
        'Manajemen data produk',
        'Pencatatan transaksi stok masuk dan keluar',
        'Dashboard ringkasan inventaris',
        'Kontrol akses berbasis peran',
        'Antarmuka dark mode',
        'Self-hosted dan open source',
      ],
      author: {
        '@type': 'Person',
        name: 'Naufal Rabbani',
        url: 'https://naufalrabbani.com',
      },
    },
  ],
}

interface RootLayoutProps {
  children: ReactNode
}

export default async function RootLayout(props: RootLayoutProps) {
  const { children } = props

  return (
    <html lang="id" className="scroll-smooth">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
