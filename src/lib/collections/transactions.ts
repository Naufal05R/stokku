import type { CollectionConfig, Validate } from 'payload'
import type { Transaction } from '@/payload-types'

import { TRANSACTION_TYPE_OPTIONS } from '@/modules/items/constants/transaction'

const validateQuantity: Validate<number, Transaction> = async (value, { data, req, event }) => {
  if (event === 'onChange') return true

  if (value !== undefined && value !== null && value < 1) {
    return 'Jumlah harus lebih besar dari 0'
  }

  if (data?.type === 'outbound') {
    const id = typeof data.item === 'object' ? data.item?.id : data.item
    if (!id) return 'Pilih barang terlebih dahulu'

    const item = await req.payload.findByID({
      collection: 'items',
      id,
    })

    if (value && item.quantity !== undefined && value > item.quantity) {
      return `Stok tidak mencukupi. Sisa stok: ${item.quantity}`
    }
  }
  return true
}

export const Transactions: CollectionConfig<'transactions'> = {
  slug: 'transactions',
  defaultSort: '',
  access: {
    update: () => false,
    delete: () => false,
    create: ({ req }) => req.user?.role === 'admin',
  },
  admin: {
    useAsTitle: 'reference',
    hidden: false,
    group: 'Warehouse',
    components: {
      views: {
        edit: {
          root: {
            Component:
              '/modules/transactions/templates/transaction-detail-page#TransactionDetailPage',
          },
        },
        list: {
          Component: '/modules/transactions/components/transaction-list#TransactionListPage',
        },
      },
    },
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'item',
          label: 'Barang',
          type: 'relationship',
          relationTo: 'items',
          required: true,
          admin: { width: '40%' },
        },
        {
          name: 'type',
          label: 'Tipe Transaksi',
          type: 'select',
          required: true,
          options: TRANSACTION_TYPE_OPTIONS,
          admin: { width: '30%' },
        },
        {
          name: 'quantity',
          label: 'Jumlah',
          type: 'number',
          required: true,
          min: 1,
          validate: validateQuantity,
          admin: { width: '30%' },
        },
      ],
    },
    {
      name: 'reference',
      label: 'Nomor Referensi',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'note',
      label: 'Catatan',
      type: 'textarea',
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'create' && !data.reference) {
          data.reference = `TRX-${Date.now()}`
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === 'create') {
          const itemId = typeof doc.item === 'object' ? doc.item.id : doc.item
          const item = await req.payload.findByID({
            collection: 'items',
            id: itemId,
          })
          const newQuantity =
            doc.type === 'inbound' ? item.quantity + doc.quantity : item.quantity - doc.quantity
          await req.payload.update({
            collection: 'items',
            id: itemId,
            data: { quantity: newQuantity },
          })
        }
      },
    ],
  },
}
