'use client'

import type { ComponentProps } from 'react'

import { useId, useState } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

import { cn } from '@/modules/common/utils'

import { Label } from './label'
import { Input } from './input'

export const InputWithShowHideButton = ({
  type,
  className,
  ...props
}: ComponentProps<typeof Input>) => {
  const id = useId()
  const [isVisible, setIsVisible] = useState<boolean>(type !== 'password')

  const toggleVisibility = () => setIsVisible((prevState) => !prevState)

  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id} className={cn('relative', className)}>
        <Input
          className="pe-9"
          id={id}
          placeholder="Kata Sandi"
          type={isVisible ? 'text' : 'password'}
          {...props}
        />
        <button
          aria-controls="password"
          aria-label={isVisible ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
          aria-pressed={isVisible}
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none cursor-pointer transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          onClick={toggleVisibility}
          type="button"
        >
          {isVisible ? (
            <EyeOffIcon aria-hidden="true" size={16} />
          ) : (
            <EyeIcon aria-hidden="true" size={16} />
          )}
        </button>
      </Label>
    </div>
  )
}
