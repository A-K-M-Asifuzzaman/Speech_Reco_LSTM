"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileAudio, Clock, History } from "lucide-react"
import { emotionColors } from "@/lib/api"

interface HistoryItem {
  name: string
  emotion: string
  timestamp: Date
}

function EmotionBadge({ emotion }: { emotion: string }) {
  const color = emotionColors[emotion.toLowerCase()] || "#6b7280"
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ backgroundColor: `${color}1a`, color, border: `1px solid ${color}35` }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
      {emotion}
    </span>
  )
}

function timeAgo(date: Date): string {
  const diff = (Date.now() - date.getTime()) / 1000
  if (diff < 60) return `${Math.floor(diff)}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  return `${Math.floor(diff / 3600)}h ago`
}

export function PredictionHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([])

  if (typeof window !== "undefined") {
    ;(window as any).addPrediction = (item: { name: string; emotion: string }) => {
      setHistory((prev) => [{ ...item, timestamp: new Date() }, ...prev.slice(0, 19)])
    }
  }

  return (
    <div className="glass-card rounded-2xl border border-border/40 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border/35">
        <div>
          <h3 className="text-base font-semibold">Prediction History</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Recent analysis results</p>
        </div>
        {history.length > 0 && (
          <span className="text-xs font-mono bg-secondary/60 px-2.5 py-1 rounded-full text-muted-foreground">
            {history.length} entries
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 gap-3 text-center">
            <div className="w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center">
              <History className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">No predictions yet</p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                Go to Predict and analyze some audio
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <AnimatePresence initial={false}>
              {history.map((item, i) => (
                <motion.div
                  key={`${item.name}-${item.timestamp.getTime()}`}
                  initial={{ opacity: 0, x: -16, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: "auto" }}
                  exit={{ opacity: 0, x: 16, height: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-secondary/20 hover:bg-secondary/35 transition-colors duration-200 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <FileAudio className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate max-w-[180px] sm:max-w-xs">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {timeAgo(item.timestamp)}
                      </p>
                    </div>
                  </div>
                  <EmotionBadge emotion={item.emotion} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}
