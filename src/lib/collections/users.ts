import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    hidden: true,
  },
  access: {
    create: () => false,
    read: () => false,
    update: () => false,
    delete: () => false,
  },
  auth: true,
  fields: [
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      required: true,
      defaultValue: 'guest',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Guest', value: 'guest' },
      ],
    },
  ],
}
