import sharp from 'sharp'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { Items, Users } from '@/lib/collections'
import { Transactions } from '@/lib/collections/transactions'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    components: {
      graphics: {
        Logo: '@/modules/common/components#Logo',
        Icon: '@/modules/common/components#Icon',
      },
      actions: ['@/modules/common/components#SwitchTheme'],
      Nav: '@/modules/common/components#Nav',
      views: {
        dashboard: {
          Component: '@/modules/dashboard/templates/dashboard-page#DashboardPage',
        },
        account: {
          Component: '@/modules/account/templates#AccountPage',
        },
        login: {
          Component: '@/modules/auth/templates#LoginPage',
          path: '/login',
        },
        forgotPassword: {
          Component: '@/modules/auth/templates#ForgotPasswordPage',
          path: '/forgot',
        },
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Items, Transactions, Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '12345678',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
  bin: [
    {
      scriptPath: path.resolve(dirname, 'scripts/seeds.ts'),
      key: 'seed',
    },
  ],
})
