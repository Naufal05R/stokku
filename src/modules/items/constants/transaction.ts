import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'

export const TRANSACTION_TYPE_OPTIONS = [
  {
    label: 'Barang Masuk',
    value: 'inbound',
    icon: ArrowDownLeft,
  },
  {
    label: 'Barang Keluar',
    value: 'outbound',
    icon: ArrowUpRight,
  },
]
