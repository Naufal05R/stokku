'use server'

import { headers, cookies } from 'next/headers'

import { payload } from '@/lib/sdk'

export interface LoginState {
  error?: string
  success?: boolean
  email?: string
  password?: string
}

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email dan kata sandi wajib diisi', email, password }
  }

  try {
    const headersList = await headers()

    const { token, exp } = await payload.login({
      collection: 'users',
      data: {
        email,
        password,
      },
      req: {
        headers: headersList,
      },
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

    return { success: true, email, password }
  } catch (error: any) {
    return { error: error.message || 'Gagal masuk', email, password }
  }
}
