'use client'

import { useActionState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

import { Button, Input, InputWithShowHideButton, ErrorToast, Label } from '@/modules/common/components'

import { login } from '../actions'

export const LoginForm = () => {
  const searchParams = useSearchParams()
  const [state, formAction, isPending] = useActionState(login, {
    success: false,
    error: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    if (state.success) {
      const redirect = searchParams.get('redirect')
      window.location.href = redirect || '/admin'
    } else if (state.error) {
      toast.custom((id) => <ErrorToast id={id} message={state.error!} />)
    }
  }, [state, searchParams])

  return (
    <form action={formAction} className="p-4 w-full grid gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="email@contoh.com"
          defaultValue={state.email}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          disabled={isPending}
          required
        />
      </div>
      <div className="grid gap-1.5">
        <Label>Kata Sandi</Label>
        <InputWithShowHideButton
          name="password"
          type="password"
          placeholder="Kata sandi"
          defaultValue={state.password}
          autoComplete="current-password"
          disabled={isPending}
          required
        />
      </div>
      <Button disabled={isPending} className="mt-8 w-full">
        {isPending ? 'Masuk...' : 'Masuk'}
      </Button>
    </form>
  )
}
