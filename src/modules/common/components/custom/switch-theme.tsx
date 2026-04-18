'use client'

import { MoonIcon, SunIcon } from 'lucide-react'
import { useId, useState, useEffect } from 'react'
import { useTheme } from '@payloadcms/ui'

import { cn } from '@/modules/common/utils'

import { Label, Switch } from '../ui'

export const SwitchTheme = () => {
  const id = useId()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const checked = theme === 'dark'

  const handleCheckedChange = (isChecked: boolean) => {
    setTheme(isChecked ? 'dark' : 'light')
  }

  if (!mounted) {
    return (
      <div className="relative inline-grid h-9 grid-cols-[1fr_1fr] items-center font-medium text-sm">
        <div className="size-full rounded-full bg-input/50" />
      </div>
    )
  }

  return (
    <>
      <div className="relative inline-grid h-9 grid-cols-[1fr_1fr] items-center font-medium text-sm">
        <Switch
          checked={checked}
          className={cn(
            'p-px peer [&_span]:data-[state=checked]:rtl:-translate-x-full absolute inset-0 h-[inherit] w-auto data-[state=checked]:bg-input/50 data-[state=unchecked]:bg-input/50 [&_span]:h-full [&_span]:w-1/2 [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-[cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-full',
          )}
          id={id}
          onCheckedChange={handleCheckedChange}
        />
        <span className="pointer-events-none relative ms-0.5 flex min-w-8 items-center justify-center text-center peer-data-[state=checked]:text-muted-foreground/70">
          <SunIcon aria-hidden="true" size={16} />
        </span>
        <span className="pointer-events-none relative me-0.5 flex min-w-8 items-center justify-center text-center peer-data-[state=unchecked]:text-muted-foreground/70">
          <MoonIcon aria-hidden="true" size={16} />
        </span>
      </div>
      <Label className="sr-only" htmlFor={id}>
        Theme Switcher
      </Label>
    </>
  )
}
