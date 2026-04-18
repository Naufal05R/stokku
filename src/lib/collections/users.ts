import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    hidden: true,
  },
  access: {
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  auth: true,
  fields: [],
}
