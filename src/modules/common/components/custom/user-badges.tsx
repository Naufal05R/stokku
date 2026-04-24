import type { AdminViewServerProps } from 'payload'

import { ROLE_ACCESS_LEVELS } from '@/modules/users/constants/role'

import { Badge } from '../ui/badge'

export const UserBadges = ({ user }: AdminViewServerProps) => {
  const access = ROLE_ACCESS_LEVELS[user?.role || 'guest']

  return (
    <div className="flex items-center gap-2">
      <Badge variant="secondary" className="capitalize">
        {user?.role}
      </Badge>
      <Badge variant="outline" className="capitalize">
        {access}
      </Badge>
    </div>
  )
}
