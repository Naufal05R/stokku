'use server'

import { headers, cookies } from 'next/headers'

import { payload } from '@/lib/sdk'

import type { LoginState } from './login'

export async function loginAsGuest(): Promise<LoginState> {
  const email = process.env.DEFAULT_GUEST_USER_EMAIL
  const password = process.env.DEFAULT_GUEST_USER_PASSWORD

  if (!email || !password) {
    return { error: 'Akun tamu tidak tersedia' }
  }

  try {
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

    return { success: true }
  } catch (error: any) {
    return { error: error.message || 'Gagal masuk sebagai tamu' }
  }
}
