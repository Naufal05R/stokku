import { redirect } from 'next/navigation'
import { HomePage } from '@/modules/home/templates'

export default function Page() {
  if (process.env.ENABLE_LANDING_PAGE !== 'true') {
    redirect('/admin')
  }

  return <HomePage />
}
