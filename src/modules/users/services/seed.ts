import { Payload } from 'payload'

export const seedUser = async (payload: Payload): Promise<void> => {
  const adminEmail = 'admin@wms.com'

  const existingUser = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: adminEmail,
      },
    },
  })

  if (existingUser.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: adminEmail,
        password: '12345678',
      },
    })
  }

  payload.logger.info('Seeder: Default admin user created successfully')
}
