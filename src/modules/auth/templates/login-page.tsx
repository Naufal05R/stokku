import React, { Suspense } from 'react'

import { Toaster } from '@/modules/common/components'

import { LoginForm } from '../components'

export const LoginPage = () => {
  return (
    <div className="twp w-full flex items-center justify-center overflow-hidden">
      <Toaster />
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  )
}
