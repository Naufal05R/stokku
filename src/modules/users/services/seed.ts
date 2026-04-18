import { Payload } from 'payload'

const { email, password } = {
  email: process.env.ADMIN_DEFAULT_USER_EMAIL,
  password: process.env.ADMIN_DEFAULT_USER_PASSWORD,
}

export const seedUser = async (payload: Payload): Promise<void> => {
  if (!email || !password) {
    payload.logger.info('Seeder: ADMIN_DEFAULT_USER_EMAIL or ADMIN_DEFAULT_USER_PASSWORD not set')
    payload.logger.info('Seeder: Skipping default admin user creation')
    return
  }

  const existingUser = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
  })

  if (existingUser.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: { email, password },
    })
  }

  payload.logger.info('Seeder: Default admin user created successfully')
}
