'use server'

import { redirect } from 'next/navigation'
import { headers, cookies } from 'next/headers'

import { payload } from '@/lib/sdk'

export interface CreateFirstUserState {
  error?: string
  email?: string
}

export async function createFirstUser(
  _prevState: CreateFirstUserState,
  formData: FormData,
): Promise<CreateFirstUserState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirm-password') as string

  if (!email || !password || !confirmPassword) {
    return { error: 'Semua kolom wajib diisi', email }
  }

  if (password !== confirmPassword) {
    return { error: 'Konfirmasi kata sandi tidak cocok', email }
  }

  if (password.length < 8) {
    return { error: 'Kata sandi minimal 8 karakter', email }
  }

  try {
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 1,
      overrideAccess: true,
    })

    if (existingUsers.totalDocs > 0) {
      return { error: 'Pengguna sudah ada. Silakan masuk.' }
    }

    await payload.create({
      collection: 'users',
      data: { email, password, role: 'admin' },
      overrideAccess: true,
    })

    const headersList = await headers()
    const { token, exp } = await payload.login({
      collection: 'users',
      data: { email, password },
      req: { headers: headersList },
    })

    if (token) {
      const cookieStore = await cookies()
      cookieStore.set('payload-token', token, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: exp ? new Date(exp * 1000) : undefined,
      })
    }

    redirect('/admin')
  } catch (error: any) {
    return { error: error.message || 'Gagal membuat akun', email }
  }
}
