import type { CollectionConfig } from 'payload'

import { ITEM_CATEGORY_OPTIONS } from '@/modules/items/constants'
import { ITEM_UNIT_OPTIONS } from '@/modules/items/constants'

export const Items: CollectionConfig = {
  slug: 'items',
  defaultSort: '',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    group: 'Warehouse',
    listSearchableFields: ['name', 'code'],
    defaultColumns: ['code', 'name', 'quantity', 'minQuantity', 'category', 'position'],
    components: {
      views: {
        // list: {
        //   Component: '@/modules/items/templates#ItemListPage',
        // },
        // edit: {
        //   root: {
        //     Component: '@/modules/items/templates#ItemCreatePage',
        //   },
        // },
      },
    },
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          label: 'Nama Barang',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
            placeholder: 'Contoh: Laptop Gaming',
            components: {
              Field: '@/modules/common/components#TextField',
            },
          },
        },
        {
          name: 'position',
          label: 'Posisi Rak',
          type: 'text',
          admin: {
            width: '50%',
            placeholder: 'Contoh: Rak A-01',
            components: {
              Field: '@/modules/common/components#TextField',
            },
          },
        },
        {
          name: 'code',
          label: 'Kode (SKU)',
          type: 'text',
          required: true,
          unique: true,
          admin: {
            width: 'calc(100%/6)',
            placeholder: 'Contoh: BRG-001',
            components: {
              Field: '@/modules/common/components#TextField',
            },
          },
        },
        {
          name: 'category',
          label: 'Kategori',
          type: 'select',
          options: ITEM_CATEGORY_OPTIONS,
          admin: {
            width: 'calc(100%/6)',
            placeholder: 'Pilih kategori',
            components: {
              Field: '@/modules/common/components#SelectField',
            },
          },
        },
        {
          name: 'unit',
          label: 'Satuan (UoM)',
          type: 'select',
          required: true,
          options: ITEM_UNIT_OPTIONS,
          admin: {
            width: 'calc(100%/6)',
            placeholder: 'Pilih satuan',
            components: {
              Field: '@/modules/common/components#SelectField',
            },
          },
        },
        {
          name: 'quantity',
          label: 'Stok Saat Ini',
          type: 'number',
          required: true,
          defaultValue: 0,
          admin: {
            width: '25%',
            readOnly: true,
            placeholder: '0',
            components: {
              Field: '@/modules/common/components#NumberField',
            },
          },
          access: {
            create: () => false,
            update: () => false,
          },
        },
        {
          name: 'minQuantity',
          label: 'Stok Minimum',
          type: 'number',
          defaultValue: 0,
          admin: {
            width: '25%',
            placeholder: '0',
            components: {
              Field: '@/modules/common/components#NumberField',
            },
          },
        },
      ],
    },
  ],
}
