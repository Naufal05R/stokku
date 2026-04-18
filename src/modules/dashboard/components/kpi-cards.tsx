import { AlertTriangle, Box, Package, Activity } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/modules/common/components/ui/card'
import { cn } from '@/modules/common/utils'

export interface KPICardsProps {
  totalItems: number
  totalStock: number
  lowStockCount: number
  inboundCount: number
  outboundCount: number
}

export function KPICards({
  totalItems,
  totalStock,
  lowStockCount,
  inboundCount,
  outboundCount,
}: KPICardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total SKU Aktif</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalItems}</div>
          <p className="text-xs text-muted-foreground">Jenis barang terdaftar</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Stok Fisik</CardTitle>
          <Box className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalStock.toLocaleString('id-ID')}</div>
          <p className="text-xs text-muted-foreground">Unit barang di gudang</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Aktivitas Hari Ini</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inboundCount + outboundCount}</div>
          <p className="text-xs text-muted-foreground">
            {inboundCount} Masuk / {outboundCount} Keluar
          </p>
        </CardContent>
      </Card>

      <Card className={cn({ 'border-destructive': lowStockCount > 0 })}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-destructive">Peringatan Stok</CardTitle>
          <AlertTriangle className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">{lowStockCount}</div>
          <p className="text-xs text-destructive">Barang di bawah minimum</p>
        </CardContent>
      </Card>
    </div>
  )
}
