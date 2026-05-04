'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import type { ComponentProps } from 'react'

import { Button } from '@/modules/common/components/ui'
import { loginAsGuest } from '@/modules/auth/actions'

export function DemoButton({ children, onClick, ...props }: ComponentProps<typeof Button>) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e)
    startTransition(async () => {
      await loginAsGuest()
      router.push('/admin')
    })
  }

  return (
    <Button {...props} disabled={isPending || props.disabled} onClick={handleClick}>
      {isPending ? 'Memuat...' : children}
    </Button>
  )
}
