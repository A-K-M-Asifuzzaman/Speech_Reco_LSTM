"use client"

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts"

const data = [
  { date: "Jan", accuracy: 88.2 },
  { date: "Feb", accuracy: 89.5 },
  { date: "Mar", accuracy: 90.1 },
  { date: "Apr", accuracy: 91.3 },
  { date: "May", accuracy: 92.0 },
  { date: "Jun", accuracy: 91.8 },
  { date: "Jul", accuracy: 92.5 },
  { date: "Aug", accuracy: 93.1 },
  { date: "Sep", accuracy: 93.8 },
  { date: "Oct", accuracy: 94.0 },
  { date: "Nov", accuracy: 94.2 },
  { date: "Dec", accuracy: 94.5 },
]

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card rounded-xl px-4 py-3 border border-border/50 text-sm">
      <p className="text-muted-foreground text-xs mb-1">{label}</p>
      <p className="font-bold font-mono" style={{ color: "oklch(0.76 0.20 195)" }}>
        {payload[0].value}%
      </p>
    </div>
  )
}

export function AccuracyChart() {
  return (
    <div className="glass-card rounded-2xl p-6 border border-border/40 h-[350px] flex flex-col">
      <div className="mb-4">
        <h3 className="text-base font-semibold">Model Accuracy Over Time</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Monthly accuracy improvements</p>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 6, right: 6, left: -22, bottom: 0 }}>
            <defs>
              <linearGradient id="accuracyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.76 0.20 195)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="oklch(0.76 0.20 195)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="oklch(0.22 0.025 260)"
              strokeOpacity={0.6}
            />
            <XAxis
              dataKey="date"
              stroke="oklch(0.54 0.02 260)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "oklch(0.54 0.02 260)" }}
            />
            <YAxis
              domain={[86, 96]}
              stroke="oklch(0.54 0.02 260)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}%`}
              tick={{ fill: "oklch(0.54 0.02 260)" }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "oklch(0.76 0.20 195 / 0.3)", strokeWidth: 1 }} />
            <Area
              type="monotone"
              dataKey="accuracy"
              stroke="oklch(0.76 0.20 195)"
              strokeWidth={2.5}
              fill="url(#accuracyGrad)"
              dot={false}
              activeDot={{
                r: 5,
                fill: "oklch(0.76 0.20 195)",
                stroke: "oklch(0.06 0.012 260)",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
