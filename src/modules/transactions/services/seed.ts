import type { Payload } from 'payload'

import { format } from 'date-fns'

export const seedTransactions = async (payload: Payload): Promise<void> => {
  const { docs: items } = await payload.find({
    collection: 'items',
    limit: 1000,
  })

  if (items.length === 0) {
    payload.logger.error('Seeder: No items found to create transactions')
    return
  }

  const { totalDocs: existingCount } = await payload.find({
    collection: 'transactions',
    limit: 1,
  })

  if (existingCount > 0) {
    payload.logger.info('Seeder: Transactions collection is already seeded')
    return
  }

  const initialStockMap = new Map<number, number>()
  items.forEach((item) => {
    initialStockMap.set(item.id, item.quantity || 0)
  })

  const DAYS = 10
  const inboundNotes = [
    'Restock bulanan dari supplier utama',
    'Penerimaan barang dari vendor baru',
    'Update stok gudang hasil opname',
    'Masuk dari gudang pusat distribusi',
    'Stok awal tahun baru untuk operasional',
    'Penerimaan paket pengadaan inventaris',
    'Inbound sisa pameran teknologi',
    'Penerimaan hibah perlengkapan kantor',
    'Barang masuk hasil tukar guling aset',
    'Penambahan stok mendadak untuk event',
    'Restock rutin mingguan departemen',
    'Penerimaan batch kedua kiriman supplier',
    'Restock persiapan promo akhir tahun',
    'Penerimaan kiriman khusus dari cabang',
  ]

  const outboundNotes = [
    'Pengiriman barang rutin ke klien',
    'Distribusi ke cabang Jakarta Selatan',
    'Pengambilan inventaris untuk proyek A',
    'Distribusi untuk kebutuhan tim sales',
    'Alokasi barang untuk event internal',
    'Kebutuhan maintenance rutin fasilitas',
    'Outbound untuk renovasi laboratorium',
    'Pengambilan sampel produk untuk QA',
    'Distribusi rutin untuk divisi marketing',
    'Pengeluaran barang rusak untuk reject',
    'Keluar untuk peminjaman aset sementara',
    'Permintaan mendesak operasional lapangan',
    'Distribusi perlengkapan ke unit baru',
    'Pengeluaran barang untuk hibah sosial',
    'Alokasi stok untuk pengujian sistem',
  ]

  interface TransactionPlan {
    item: number
    type: 'inbound' | 'outbound'
    quantity: number
    date: Date
    note: string
  }

  const plan: TransactionPlan[] = []
  const itemLedger = new Map<number, TransactionPlan[]>()

  const addToLedger = (txn: TransactionPlan) => {
    if (!itemLedger.has(txn.item)) {
      itemLedger.set(txn.item, [])
    }
    const list = itemLedger.get(txn.item)!
    list.push(txn)
    list.sort((a, b) => a.date.getTime() - b.date.getTime())
    plan.push(txn)
  }

  const getSafeAvailableStock = (itemId: number, time: Date) => {
    let runningStock = initialStockMap.get(itemId) || 0
    const txns = itemLedger.get(itemId) || []
    let minFutureStock = Infinity
    let stockAtTime = runningStock

    for (const txn of txns) {
      if (txn.type === 'inbound') runningStock += txn.quantity
      else runningStock -= txn.quantity

      if (txn.date <= time) {
        stockAtTime = runningStock
      } else {
        if (runningStock < minFutureStock) {
          minFutureStock = runningStock
        }
      }
    }

    if (minFutureStock === Infinity) return stockAtTime
    return Math.min(stockAtTime, minFutureStock)
  }

  const now = new Date()
  const startDate = new Date(now)
  startDate.setDate(now.getDate() - 9)
  startDate.setHours(0, 0, 0, 0)

  for (let day = 0; day < DAYS; day++) {
    const dayStart = new Date(startDate)
    dayStart.setDate(dayStart.getDate() + day)
    dayStart.setHours(8, 0, 0, 0)

    if (dayStart > now && dayStart.toDateString() === now.toDateString()) {
      dayStart.setTime(now.getTime())
    }

    if (dayStart > now) break

    const dayEnd = new Date(dayStart)
    dayEnd.setHours(17, 0, 0, 0)
    if (dayEnd > now) dayEnd.setTime(now.getTime())

    const getRandomTimeInDay = () => {
      const start = dayStart.getTime()
      const end = dayEnd.getTime()
      return start === end ? new Date(start) : new Date(start + Math.random() * (end - start))
    }

    const inCount = Math.floor(Math.random() * 6) + 5
    for (let i = 0; i < inCount; i++) {
      const item = items[Math.floor(Math.random() * items.length)]
      addToLedger({
        item: item.id,
        type: 'inbound',
        quantity: Math.floor(Math.random() * 50) + 10,
        date: getRandomTimeInDay(),
        note: inboundNotes[Math.floor(Math.random() * inboundNotes.length)],
      })
    }

    const outCount = Math.floor(Math.random() * 6) + 5
    let createdOut = 0
    let attempts = 0

    while (createdOut < outCount && attempts < 1000) {
      attempts++
      const checkDate = getRandomTimeInDay()
      const item = items[Math.floor(Math.random() * items.length)]
      const safeStock = getSafeAvailableStock(item.id, checkDate)

      if (safeStock > 0) {
        let qty = 0
        const isDepletion = Math.random() < 0.2

        if (isDepletion) {
          qty = safeStock
        } else {
          const maxQty = Math.min(safeStock, Math.floor(Math.random() * 20) + 1)
          qty = Math.max(1, Math.floor(Math.random() * maxQty) + 1)
        }

        addToLedger({
          item: item.id,
          type: 'outbound',
          quantity: qty,
          date: checkDate,
          note: isDepletion
            ? 'Pemusnahan stok / Penyesuaian akhir (Depletion)'
            : outboundNotes[Math.floor(Math.random() * outboundNotes.length)],
        })
        createdOut++
      }
    }
  }

  plan.sort((a, b) => a.date.getTime() - b.date.getTime())

  let processedCount = 0

  for (const [, txn] of plan.entries()) {
    const ref = `TRX-${txn.date.getTime()}`

    await payload.create({
      collection: 'transactions',
      data: {
        item: txn.item,
        type: txn.type,
        quantity: txn.quantity,
        reference: ref,
        note: txn.note,
        createdAt: format(txn.date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
      },
    })

    processedCount++
  }

  payload.logger.info(`Seeder: Successfully seeded ${processedCount} transactions.`)
}
