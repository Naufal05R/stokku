'use client'

import { Bar, BarChart, CartesianGrid, Pie, PieChart, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/modules/common/components/ui/card'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/modules/common/components/ui/chart'

export interface StockHistory {
  date: string
  inbound: number
  outbound: number
}

export interface CategoryData {
  name: string
  value: number
}

export interface StockChartsProps {
  stockHistory: StockHistory[]
  categoryDistribution: CategoryData[]
}

const COLORS = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
  'var(--color-chart-5)',
]

export function StockCharts({ stockHistory, categoryDistribution }: StockChartsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Pergerakan Stok (7 Hari Terakhir)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              inbound: {
                label: 'Masuk',
                color: 'var(--color-primary)',
              },
              outbound: {
                label: 'Keluar',
                color: 'var(--color-destructive)',
              },
            }}
            className="min-h-50 w-full"
          >
            <BarChart accessibilityLayer data={stockHistory}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="date" tickLine={false} tickMargin={10} axisLine={false} />
              <YAxis tickLine={false} tickMargin={10} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <ChartLegend content={<ChartLegendContent payload={undefined} />} />
              <Bar dataKey="inbound" fill="var(--color-primary)" radius={4} />
              <Bar dataKey="outbound" fill="var(--color-destructive)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Komposisi Kategori</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={{
              Electronics: { label: 'Elektronik', color: `var(--color-chart-1)` },
              Food: { label: 'Makanan', color: `var(--color-chart-2)` },
              'Office Supplies': { label: 'Alat Kantor', color: `var(--color-chart-3)` },
              Clothing: { label: 'Pakaian', color: `var(--color-chart-4)` },
              Automotive: { label: 'Otomotif', color: `var(--color-chart-5)` },
              Health: { label: 'Kesehatan', color: `var(--color-chart-1)` },
              Toys: { label: 'Mainan', color: `var(--color-chart-2)` },
              Sports: { label: 'Olahraga', color: `var(--color-chart-3)` },
              Tools: { label: 'Perkakas', color: `var(--color-chart-4)` },
              Books: { label: 'Buku', color: `var(--color-chart-5)` },
            }}
            className="mx-auto"
          >
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={categoryDistribution.map((category, index) => ({
                  ...category,
                  fill: COLORS[index % COLORS.length],
                }))}
                nameKey="name"
                dataKey="value"
              />
              <ChartLegend
                content={<ChartLegendContent nameKey="name" payload={undefined} />}
                className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
