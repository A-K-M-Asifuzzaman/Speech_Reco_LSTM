"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { time: "00:00", responseTime: 245 },
  { time: "04:00", responseTime: 198 },
  { time: "08:00", responseTime: 312 },
  { time: "12:00", responseTime: 287 },
  { time: "16:00", responseTime: 356 },
  { time: "20:00", responseTime: 267 },
  { time: "Now", responseTime: 234 },
]

export function ResponseTimeChart() {
  return (
    <div className="glass-card rounded-xl p-6 border border-border/50 h-[300px]">
      <h3 className="text-lg font-semibold mb-4">API Response Times (ms)</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.03 260)" />
          <XAxis
            dataKey="time"
            stroke="oklch(0.6 0.02 260)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="oklch(0.6 0.02 260)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "oklch(0.12 0.015 260)",
              border: "1px solid oklch(0.25 0.03 260)",
              borderRadius: "8px",
              color: "oklch(0.95 0 0)",
            }}
            formatter={(value: number) => [`${value}ms`, "Response Time"]}
            cursor={{ fill: "oklch(0.25 0.03 260 / 0.3)" }}
          />
          <Bar
            dataKey="responseTime"
            fill="oklch(0.7 0.15 330)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
