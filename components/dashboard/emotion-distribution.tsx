"use client"

import { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { emotionColors } from "@/lib/api"

export function EmotionDistribution() {
  const [data, setData] = useState<any[]>([])

  if (typeof window !== "undefined") {
    ;(window as any).updateEmotionChart = (emotion: string) => {
      setData((prev) => {
        const found = prev.find((p) => p.name === emotion)
        if (found) {
          return prev.map((p) =>
            p.name === emotion ? { ...p, value: p.value + 1 } : p
          )
        }
        return [...prev, { name: emotion, value: 1 }]
      })
    }
  }

  return (
    <div className="glass-card p-6 rounded-xl h-[350px]">
      <h3 className="mb-4 font-semibold">Emotion Distribution</h3>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={90}>
            {data.map((e, i) => (
              <Cell key={i} fill={emotionColors[e.name] || "#999"} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}