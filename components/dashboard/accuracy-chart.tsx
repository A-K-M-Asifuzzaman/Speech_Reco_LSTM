"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

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

export function AccuracyChart() {
  return (
    <div className="glass-card rounded-xl p-6 border border-border/50 h-[350px]">
      <h3 className="text-lg font-semibold mb-4">Model Accuracy Over Time</h3>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="oklch(0.75 0.18 195)" stopOpacity={0.4} />
              <stop offset="95%" stopColor="oklch(0.75 0.18 195)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.03 260)" />
          <XAxis
            dataKey="date"
            stroke="oklch(0.6 0.02 260)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            domain={[85, 100]}
            stroke="oklch(0.6 0.02 260)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "oklch(0.12 0.015 260)",
              border: "1px solid oklch(0.25 0.03 260)",
              borderRadius: "8px",
              color: "oklch(0.95 0 0)",
            }}
            formatter={(value: number) => [`${value}%`, "Accuracy"]}
          />
          <Area
            type="monotone"
            dataKey="accuracy"
            stroke="oklch(0.75 0.18 195)"
            strokeWidth={2}
            fill="url(#accuracyGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
