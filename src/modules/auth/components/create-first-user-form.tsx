'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@payloadcms/ui'
import { toast } from 'sonner'

import { Button, Input, InputWithShowHideButton, ErrorToast, Label } from '@/modules/common/components'

export const CreateFirstUserForm = () => {
  const router = useRouter()
  const { setUser } = useAuth()
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirm-password') as string

    if (password !== confirmPassword) {
      toast.custom((id) => <ErrorToast id={id} message="Konfirmasi kata sandi tidak cocok" />)
      return
    }

    if (password.length < 8) {
      toast.custom((id) => <ErrorToast id={id} message="Kata sandi minimal 8 karakter" />)
      return
    }

    setIsPending(true)

    try {
      const response = await fetch('/api/users/first-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: 'admin' }),
        credentials: 'include',
      })

      const data = await response.json()

      if (!response.ok) {
        const message = data.errors?.[0]?.message || data.message || 'Gagal membuat akun'
        toast.custom((id) => <ErrorToast id={id} message={message} />)
        return
      }

      setUser(data)
      router.push('/admin')
    } catch {
      toast.custom((id) => <ErrorToast id={id} message="Terjadi kesalahan, coba lagi" />)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 w-full grid gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="email@contoh.com"
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
          placeholder="Minimal 8 karakter"
          autoComplete="new-password"
          disabled={isPending}
          required
        />
      </div>
      <div className="grid gap-1.5">
        <Label>Konfirmasi Kata Sandi</Label>
        <InputWithShowHideButton
          name="confirm-password"
          type="password"
          placeholder="Ulangi kata sandi"
          autoComplete="new-password"
          disabled={isPending}
          required
        />
      </div>
      <Button type="submit" disabled={isPending} className="mt-8 w-full">
        {isPending ? 'Membuat akun...' : 'Buat Akun'}
      </Button>
    </form>
  )
}
