import type { User } from '@/payload-types'

type Action = 'read' | 'create' | 'update' | 'delete'
type Access = 'full access' | 'read only'

export const ROLE_ACTIONS: Record<User['role'], Action[]> = {
  admin: ['read', 'create', 'update', 'delete'],
  guest: ['read'],
}

export const ROLE_ACCESS_LEVELS = {
  admin: 'full access',
  guest: 'read only',
} as const satisfies Record<User['role'], Access>
