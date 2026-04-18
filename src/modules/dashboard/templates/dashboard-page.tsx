import { payload } from '@/lib/sdk'

import { CriticalStockList } from '../components/critical-stock-list'
import { KPICards } from '../components/kpi-cards'
import { RecentActivityList } from '../components/recent-activity-list'
import { StockCharts } from '../components/stock-charts'

export const DashboardPage = async () => {
  const { docs: items, totalDocs: totalItems } = await payload.find({
    collection: 'items',
    limit: 1000,
    pagination: false,
  })

  const { docs: transactions } = await payload.find({
    collection: 'transactions',
    sort: '-createdAt',
    limit: 100,
    depth: 1,
  })

  const totalStock = items.reduce((sum, item) => sum + (item.quantity || 0), 0)

  const lowStockItems = items.filter((item) => (item.quantity || 0) <= (item.minQuantity || 0))

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const todayTransactions = transactions.filter((trx) => {
    return new Date(trx.createdAt) >= today
  })

  const inboundCount = todayTransactions.filter((t) => t.type === 'inbound').length
  const outboundCount = todayTransactions.filter((t) => t.type === 'outbound').length

  const stockHistoryMap = new Map<string, { inbound: number; outbound: number }>()

  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const dateStr = d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })
    stockHistoryMap.set(dateStr, { inbound: 0, outbound: 0 })
  }

  transactions.forEach((trx) => {
    const d = new Date(trx.createdAt)
    const diffTime = Math.abs(new Date().getTime() - d.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays <= 7) {
      const dateStr = d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })
      if (stockHistoryMap.has(dateStr)) {
        const entry = stockHistoryMap.get(dateStr)!
        if (trx.type === 'inbound') {
          entry.inbound += trx.quantity
        } else {
          entry.outbound += trx.quantity
        }
      }
    }
  })

  const stockHistory = Array.from(stockHistoryMap.entries()).map(([date, data]) => ({
    date,
    ...data,
  }))

  const categoryMap = new Map<string, number>()
  items.forEach((item) => {
    const category = item.category || 'Uncategorized'
    const label = category
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    categoryMap.set(label, (categoryMap.get(label) || 0) + (item.quantity || 0))
  })

  const categoryDistribution = Array.from(categoryMap.entries()).map(([name, value]) => ({
    name,
    value,
  }))

  return (
    <section className="twp px-16 py-8 flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Rangkuman</h1>
      </header>

      <KPICards
        totalItems={totalItems}
        totalStock={totalStock}
        lowStockCount={lowStockItems.length}
        inboundCount={inboundCount}
        outboundCount={outboundCount}
      />

      <StockCharts stockHistory={stockHistory} categoryDistribution={categoryDistribution} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <CriticalStockList items={lowStockItems.slice(0, 5)} />
        </div>
        <div>
          <RecentActivityList transactions={transactions.slice(0, 5)} />
        </div>
      </div>
    </section>
  )
}
