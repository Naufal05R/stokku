'use client'

import type { ComponentProps } from 'react'

import { Plus } from 'lucide-react'

import { Button } from '../ui'
import { useRouter } from 'next/navigation'
import { ROLE_ACTIONS } from '@/modules/users/constants/role'
import { useAuth } from '@payloadcms/ui'
import { User } from '@/payload-types'

interface DataTableHeaderCreateItem extends Omit<
  ComponentProps<typeof Button>,
  'onClick' | 'disabled'
> {
  href: string
}

export const DataTableHeaderCreateItem = ({
  href,
  children,
  ...props
}: DataTableHeaderCreateItem) => {
  const { user } = useAuth<User>()
  const router = useRouter()

  const handleClick = () => {
    router.push(href)
  }

  return (
    <Button
      {...props}
      onClick={handleClick}
      disabled={!ROLE_ACTIONS[user?.role || 'guest'].includes('create')}
    >
      <Plus />
      {children}
    </Button>
  )
}
