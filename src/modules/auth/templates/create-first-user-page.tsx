import { Suspense } from 'react'

import { Toaster } from '@/modules/common/components'

import { CreateFirstUserForm } from '../components'

export const CreateFirstUserPage = () => {
  return (
    <div className="twp w-full flex items-center justify-center overflow-hidden">
      <Toaster />
      <Suspense>
        <CreateFirstUserForm />
      </Suspense>
    </div>
  )
}
