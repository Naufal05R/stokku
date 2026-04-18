import {
  Cpu,
  UtensilsCrossed,
  Briefcase,
  Shirt,
  CarFront,
  Stethoscope,
  Gamepad2,
  Dumbbell,
  Wrench,
  Book,
} from 'lucide-react'

export const ITEM_CATEGORY_OPTIONS = [
  { label: 'Elektronik', value: 'electronics', icon: Cpu },
  { label: 'Makanan', value: 'food', icon: UtensilsCrossed },
  { label: 'Alat Kantor', value: 'office_supplies', icon: Briefcase },
  { label: 'Pakaian', value: 'clothing', icon: Shirt },
  { label: 'Otomotif', value: 'automotive', icon: CarFront },
  { label: 'Kesehatan', value: 'health', icon: Stethoscope },
  { label: 'Mainan', value: 'toys', icon: Gamepad2 },
  { label: 'Olahraga', value: 'sports', icon: Dumbbell },
  { label: 'Perkakas', value: 'tools', icon: Wrench },
  { label: 'Buku', value: 'books', icon: Book },
]
