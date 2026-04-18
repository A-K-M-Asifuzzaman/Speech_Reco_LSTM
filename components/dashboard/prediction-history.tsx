"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { FileAudio } from "lucide-react"
import { emotionColors } from "@/lib/api"

export function PredictionHistory() {
  const [history, setHistory] = useState<any[]>([])

  const addPrediction = (item: any) => {
    setHistory((prev) => [item, ...prev])
  }

  // expose globally so uploader can push data
  if (typeof window !== "undefined") {
    ;(window as any).addPrediction = addPrediction
  }

  return (
    <div className="glass-card p-6 rounded-xl">
      <h3 className="text-lg font-semibold mb-4">Prediction History</h3>

      <div className="space-y-3">
        {history.map((item, i) => (
          <motion.div
            key={i}
            className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <FileAudio />
              <span>{item.name}</span>
            </div>

            <Badge
              style={{
                background: emotionColors[item.emotion] + "20",
                color: emotionColors[item.emotion],
              }}
            >
              {item.emotion}
            </Badge>
          </motion.div>
        ))}
      </div>
    </div>
  )
}