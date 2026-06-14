"use client"

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts"

const data = [
  { time: "00:00", ms: 245 },
  { time: "04:00", ms: 198 },
  { time: "08:00", ms: 312 },
  { time: "12:00", ms: 287 },
  { time: "16:00", ms: 356 },
  { time: "20:00", ms: 267 },
  { time: "Now", ms: 234 },
]

const threshold = 300

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  const val = payload[0].value
  return (
    <div className="glass-card rounded-xl px-4 py-3 border border-border/50 text-sm">
      <p className="text-muted-foreground text-xs mb-1">{label}</p>
      <p
        className="font-bold font-mono"
        style={{ color: val > threshold ? "oklch(0.72 0.18 330)" : "oklch(0.76 0.20 195)" }}
      >
        {val}ms
      </p>
    </div>
  )
}

export function ResponseTimeChart() {
  return (
    <div className="glass-card rounded-2xl p-6 border border-border/40 h-[300px] flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold">API Response Times</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Milliseconds per time window</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: "oklch(0.76 0.20 195)" }} />
            Normal
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: "oklch(0.72 0.18 330)" }} />
            High
          </span>
        </div>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 6, left: -22, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="oklch(0.22 0.025 260)"
              strokeOpacity={0.6}
              vertical={false}
            />
            <XAxis
              dataKey="time"
              stroke="oklch(0.54 0.02 260)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "oklch(0.54 0.02 260)" }}
            />
            <YAxis
              stroke="oklch(0.54 0.02 260)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}`}
              tick={{ fill: "oklch(0.54 0.02 260)" }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "oklch(0.22 0.025 260 / 0.4)" }}
            />
            <Bar dataKey="ms" radius={[5, 5, 0, 0]} maxBarSize={40}>
              {data.map((entry, i) => (
                <Cell
                  key={i}
                  fill={
                    entry.ms > threshold
                      ? "oklch(0.72 0.18 330)"
                      : "oklch(0.76 0.20 195)"
                  }
                  fillOpacity={0.85}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
