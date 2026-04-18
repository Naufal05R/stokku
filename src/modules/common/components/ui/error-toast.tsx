'use client'

import { CircleAlert, XIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from './button'

interface ErrorToastProps {
  id?: string | number
  message: string
}

export function ErrorToast({ id, message }: ErrorToastProps) {
  return (
    <div className="z-50 w-full max-w-md flex gap-2 rounded-md border border-border bg-background px-4 py-3 shadow-lg">
      <p className="grow text-sm">
        <CircleAlert
          aria-hidden="true"
          className="-mt-0.5 me-3 inline-flex text-red-500"
          size={16}
        />
        {message}
      </p>
      <Button
        aria-label="Close notification"
        className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
        variant={null}
        onClick={() => toast.dismiss(id)}
      >
        <XIcon
          aria-hidden="true"
          className="opacity-60 transition-opacity group-hover:opacity-100"
          size={16}
        />
      </Button>
    </div>
  )
}
