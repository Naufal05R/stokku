import type { ReactNode } from 'react'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

interface RootLayoutProps {
  children: ReactNode
}

export default async function RootLayout(props: RootLayoutProps) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
