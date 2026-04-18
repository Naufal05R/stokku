import type { Payload, SanitizedConfig } from 'payload'

import payload from 'payload'

import { seedUser } from '@/modules/users/services'
import { seedItems } from '@/modules/items/services'
import { seedTransactions } from '@/modules/transactions/services/seed'

export const seeds = async (payload: Payload): Promise<void> => {
  await seedUser(payload)
  await seedItems(payload)
  await seedTransactions(payload)
}

export const script = async (config: SanitizedConfig) => {
  await payload.init({ config })
  await seeds(payload)
}
