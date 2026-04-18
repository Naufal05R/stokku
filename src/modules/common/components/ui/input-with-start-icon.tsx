import type { ComponentProps } from 'react'
import type { LucideIcon } from 'lucide-react'

import { useId } from 'react'

import { cn } from '@/modules/common/utils'

import { Label } from './label'
import { Input } from './input'

interface InputWithStartIconProps extends ComponentProps<typeof Input> {
  Icon: LucideIcon
}

export const InputWithStartIcon = ({ Icon, className, ...props }: InputWithStartIconProps) => {
  const id = useId()

  return (
    <Label htmlFor={id} className={cn('relative w-full', className)}>
      <Input className="peer ps-9" id={id} {...props} />
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
        <Icon aria-hidden="true" size={16} />
      </div>
    </Label>
  )
}
