import type { Item } from '@/payload-types'
import type { Payload } from 'payload'

export const seedItems = async (payload: Payload): Promise<void> => {
  interface Data extends Pick<Item, 'category' | 'unit'> {
    prefix: string
    items: string[]
  }

  const dataset = [
    {
      category: 'electronics',
      unit: 'pcs',
      prefix: 'ELC',
      items: [
        'Monitor LG 24"',
        'Mouse Logitech G502',
        'Keyboard Mechanical RGB',
        'Kabel HDMI 2m',
        'Laptop Stand Aluminium',
        'Webcam Full HD',
        'USB Hub Type-C',
        'Headset Gaming',
        'Power Bank 10000mAh',
        'Speaker Bluetooth',
        'Smart Watch',
        'Tablet 10 Inch',
        'Charger Fast Charging',
        'Kabel LAN 5m',
        'Router WiFi 6',
      ],
    },
    {
      category: 'food',
      unit: 'box',
      prefix: 'FOD',
      items: [
        'Kopi Kapal Api 165g',
        'Indomie Goreng Jumbo',
        'Susu UHT Full Cream',
        'Biskuit Roma Kelapa',
        'Minyak Goreng 2L',
        'Gula Pasir 1kg',
        'Teh Celup Kotak',
        'Sereal Cokelat 500g',
        'Garam Dapur Refill',
        'Kecap Manis Botol',
        'Saos Sambal Botol',
        'Tepung Terigu 1kg',
        'Mie Telur Kering',
        'Sarden Kaleng Besar',
        'Beras 5kg',
      ],
    },
    {
      category: 'office_supplies',
      unit: 'box',
      prefix: 'OFC',
      items: [
        'Kertas A4 80gr',
        'Pulpen Gel Hitam',
        'Map Folder Biru',
        'Stapler Besar',
        'Gunting Kantor',
        'Double Tape 1"',
        'Tinta Printer Hitam',
        'Sticky Notes Neon',
        'Penghapus Papan Tulis',
        'Buku Kas Besar',
        'Spidol Whiteboard',
        'Lakban Bening',
        'Amplop Coklat',
        'Binder Clip',
        'Kalkulator Meja',
      ],
    },
    {
      category: 'clothing',
      unit: 'pcs',
      prefix: 'CLT',
      items: [
        'Kaos Polos Hitam L',
        'Kemeja Putih Lengan Panjang',
        'Celana Jeans Pria 32',
        'Jaket Hoodie Navy',
        'Topi Baseball',
        'Kaos Kaki Sport',
        'Sepatu Sneakers 42',
        'Sandal Casual',
        'Sabuk Kulit',
        'Dompet Pria',
        'Baju Batik Pria',
        'Celana Chino Cream',
        'Sweater Rajut',
        'Jas Hujan Poncho',
        'Sarung Tangan Motor',
      ],
    },
    {
      category: 'automotive',
      unit: 'pcs',
      prefix: 'AUTO',
      items: [
        'Oli Mesin 1L',
        'Kampas Rem Depan',
        'Busi Motor',
        'Filter Udara',
        'Lampu Depan LED',
        'Cairan Pembersih Kaca',
        'Lap Chamois',
        'Parfum Mobil',
        'Kunci Pas Set',
        'Obeng Set',
        'Dongkrak Botol',
        'Kabel Jumper Aki',
        'Sarung Stir',
        'Karpet Mobil',
        'Helm Half Face',
      ],
    },
    {
      category: 'health',
      unit: 'box',
      prefix: 'HLT',
      items: [
        'Masker Medis 3ply',
        'Hand Sanitizer 500ml',
        'Vitamin C 500mg',
        'Minyak Kayu Putih 120ml',
        'P3K Kit',
        'Termometer Digital',
        'Perban Gulung',
        'Plester Luka',
        'Obat Batuk Sirup',
        'Madu Murni 500g',
        'Tisu Basah Antiseptik',
        'Suplemen Kesehatan',
        'Alat Tensi Digital',
        'Timbangan Badan',
        'Kapas Pembersih',
      ],
    },
    {
      category: 'toys',
      unit: 'pcs',
      prefix: 'TOY',
      items: [
        'Lego Classic Set',
        'Boneka Beruang Besar',
        'Mobil Remote Control',
        'Puzzle 1000 Pcs',
        'Board Game Monopoly',
        'Kartu Uno',
        'Action Figure Hero',
        'Mainan Masak-masakan',
        'Rubik 3x3',
        'Layangan Hias',
        'Bola Sepak',
        'Raket Badminton Anak',
        'Kolam Renang Karet',
        'Pasir Kinetik',
        'Slime Warna-warni',
      ],
    },
    {
      category: 'sports',
      unit: 'pcs',
      prefix: 'SPT',
      items: [
        'Matras Yoga',
        'Dumbbell 3kg',
        'Tali Skipping',
        'Botol Minum Sport',
        'Tas Gym',
        'Bola Basket',
        'Raket Tenis',
        'Kok Badminton Slop',
        'Jersey Timnas',
        'Sepatu Lari',
        'Dekker Lutut',
        'Resistance Band',
        'Sarung Tangan Gym',
        'Topi Sport',
        'Stopwatch Digital',
      ],
    },
    {
      category: 'tools',
      unit: 'pcs',
      prefix: 'TOOL',
      items: [
        'Palu Kambing',
        'Gergaji Kayu',
        'Meteran 5m',
        'Tang Kombinasi',
        'Bor Listrik',
        'Mata Bor Set',
        'Kunci Inggris',
        'Waterpass',
        'Lem Tembak',
        'Solder Listrik',
        'Tespen Listrik',
        'Kuas Cat 3 Inch',
        'Amplas Halus',
        'Paku Beton Set',
        'Sekrup Kayu Set',
      ],
    },
    {
      category: 'books',
      unit: 'pcs',
      prefix: 'BOOK',
      items: [
        'Novel Best Seller',
        'Buku Motivasi',
        'Kamus Bahasa Inggris',
        'Buku Resep Masakan',
        'Komik Detektif',
        'Buku Tulis A5',
        'Agenda Kerja 2025',
        'Buku Gambar A3',
        'Majalah Fashion',
        'Buku Cerita Anak',
        'Ensiklopedi Sains',
        'Buku Belajar Coding',
        'Buku Keuangan',
        'Buku Sejarah Dunia',
        'Atlas Dunia',
      ],
    },
  ] satisfies Data[]

  let count = 0

  for (const group of dataset) {
    for (const [index, name] of group.items.entries()) {
      const code = `${group.prefix}-${String(index + 1).padStart(3, '0')}`

      const { totalDocs } = await payload.find({
        collection: 'items',
        where: {
          code: {
            equals: code,
          },
        },
      })

      if (totalDocs === 0) {
        const createdAt = new Date()
        createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 7))

        await payload.create({
          collection: 'items',
          data: {
            code,
            name,
            category: group.category,
            unit: group.unit,
            quantity: Math.floor(Math.random() * 50) + 10,
            minQuantity: 5,
            position: `RAK-${group.prefix.charAt(0)}-${index + 1}`,
          },
        })

        await payload.update({
          collection: 'items',
          where: {
            code: {
              equals: code,
            },
          },
          data: {
            createdAt: createdAt.toISOString(),
          },
        })

        count++
      }
    }
  }

  if (count > 0) {
    payload.logger.info(`Seeder: Successfully seeded ${count} new items`)
  } else {
    payload.logger.info('Seeder: Items collection is already up to date')
  }
}
