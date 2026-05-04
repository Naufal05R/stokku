import { Payload } from 'payload'

const seedUserByRole = async (
  payload: Payload,
  role: 'admin' | 'guest',
  email: string,
  password: string,
): Promise<void> => {
  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
  })

  if (existing.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: { email, password, role },
    })
  }

  payload.logger.info(`Seeder: Default ${role} user created successfully`)
}

export const seedUser = async (payload: Payload): Promise<void> => {
  const adminEmail = process.env.DEFAULT_ADMIN_USER_EMAIL
  const adminPassword = process.env.DEFAULT_ADMIN_USER_PASSWORD

  if (!adminEmail || !adminPassword) {
    payload.logger.info('Seeder: DEFAULT_ADMIN_USER_EMAIL or DEFAULT_ADMIN_USER_PASSWORD not set')
    payload.logger.info('Seeder: Skipping default admin user creation')
  } else {
    await seedUserByRole(payload, 'admin', adminEmail, adminPassword)
  }

  const guestEmail = process.env.DEFAULT_GUEST_USER_EMAIL
  const guestPassword = process.env.DEFAULT_GUEST_USER_PASSWORD

  if (!guestEmail || !guestPassword) {
    payload.logger.info('Seeder: DEFAULT_GUEST_USER_EMAIL or DEFAULT_GUEST_USER_PASSWORD not set')
    payload.logger.info('Seeder: Skipping default guest user creation')
  } else {
    await seedUserByRole(payload, 'guest', guestEmail, guestPassword)
  }
}
