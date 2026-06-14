"use client"

import { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { emotionColors } from "@/lib/api"
import { motion } from "framer-motion"
import { PieChart as PieIcon } from "lucide-react"

const RADIAN = Math.PI / 180

function CustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) {
  if (percent < 0.08) return null
  const radius = innerRadius + (outerRadius - innerRadius) * 0.55
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const d = payload[0]
  return (
    <div className="glass-card rounded-xl px-4 py-3 border border-border/50 text-sm">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.payload.fill }} />
        <span className="font-semibold">{d.name}</span>
      </div>
      <div className="text-muted-foreground">Count: <span className="text-foreground font-mono">{d.value}</span></div>
    </div>
  )
}

export function EmotionDistribution() {
  const [data, setData] = useState<{ name: string; value: number; fill: string }[]>([])

  if (typeof window !== "undefined") {
    ;(window as any).updateEmotionChart = (emotion: string) => {
      setData((prev) => {
        const found = prev.find((p) => p.name === emotion)
        if (found) {
          return prev.map((p) =>
            p.name === emotion ? { ...p, value: p.value + 1 } : p
          )
        }
        return [
          ...prev,
          {
            name: emotion,
            value: 1,
            fill: emotionColors[emotion.toLowerCase()] || "#6b7280",
          },
        ]
      })
    }
  }

  return (
    <div className="glass-card p-6 rounded-2xl border border-border/40 h-[350px] flex flex-col">
      <h3 className="text-base font-semibold mb-1">Emotion Distribution</h3>
      <p className="text-xs text-muted-foreground mb-4">Real-time analysis breakdown</p>

      {data.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center">
          <div className="w-12 h-12 rounded-2xl bg-secondary/60 flex items-center justify-center">
            <PieIcon className="w-6 h-6 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">No data yet</p>
            <p className="text-xs text-muted-foreground/70 mt-0.5">
              Run a prediction to see distribution
            </p>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="48%"
                outerRadius={90}
                innerRadius={40}
                paddingAngle={3}
                labelLine={false}
                label={CustomLabel}
              >
                {data.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={entry.fill}
                    stroke={`${entry.fill}50`}
                    strokeWidth={1}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value) => (
                  <span style={{ color: "oklch(0.54 0.02 260)", fontSize: 11 }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      )}
    </div>
  )
}
