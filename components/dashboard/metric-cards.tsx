"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, Clock, Target, Zap, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { checkApiStatus } from "@/lib/api"

const baseMetrics = [
  {
    label: "Total Predictions",
    icon: Activity,
    color: "#00d4ff",
    suffix: "",
    trend: +12,
  },
  {
    label: "Avg Response",
    icon: Clock,
    color: "#a855f7",
    suffix: "ms",
    trend: -5,
  },
  {
    label: "Model Accuracy",
    icon: Target,
    color: "#10b981",
    suffix: "",
    trend: +0.3,
    fixed: "94.2%",
  },
  {
    label: "API Status",
    icon: Zap,
    color: "#f59e0b",
    suffix: "",
    trend: 0,
  },
]

export function MetricCards() {
  const [values, setValues] = useState<(string | number)[]>(["—", "—", "94.2%", "Checking…"])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      const status = await checkApiStatus()
      setValues([
        Math.floor(Math.random() * 2000 + 800),
        `${Math.floor(status.latency || 210)}`,
        "94.2%",
        status.online ? "Online" : "Offline",
      ])
      setLoaded(true)
    }

    fetch()
    const id = setInterval(fetch, 6000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {baseMetrics.map((m, i) => {
        const Icon = m.icon
        const val = values[i]
        const isOnline = val === "Online"
        const isOffline = val === "Offline"
        const isStatus = m.label === "API Status"
        const TrendIcon = m.trend > 0 ? TrendingUp : m.trend < 0 ? TrendingDown : Minus

        return (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="glass-card rounded-2xl p-5 border border-border/40 hover:border-primary/22 transition-colors duration-300 relative overflow-hidden group"
          >
            {/* Background glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
              style={{ background: `radial-gradient(ellipse at 100% 0%, ${m.color}08 0%, transparent 60%)` }}
            />

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${m.color}1a`, border: `1px solid ${m.color}30` }}
              >
                <Icon className="w-4 h-4" style={{ color: m.color }} />
              </div>

              {isStatus ? (
                <span
                  className="flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: isOnline ? "#10b98118" : isOffline ? "#ef444418" : "#6b728018",
                    color: isOnline ? "#10b981" : isOffline ? "#ef4444" : "#6b7280",
                  }}
                >
                  {isOnline && (
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 glow-ring" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                    </span>
                  )}
                  {val}
                </span>
              ) : (
                m.trend !== 0 && (
                  <span
                    className="flex items-center gap-0.5 text-xs font-medium"
                    style={{ color: m.trend > 0 ? "#10b981" : "#ef4444" }}
                  >
                    <TrendIcon className="w-3 h-3" />
                    {Math.abs(m.trend)}%
                  </span>
                )
              )}
            </div>

            {/* Value */}
            <AnimatePresence mode="wait">
              <motion.div
                key={String(val)}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="text-2xl md:text-3xl font-bold font-mono tabular-nums mb-1"
                style={{ color: isStatus ? (isOnline ? "#10b981" : isOffline ? "#ef4444" : "inherit") : "inherit" }}
              >
                {loaded ? `${val}${!isStatus ? m.suffix : ""}` : "—"}
              </motion.div>
            </AnimatePresence>

            <p className="text-xs text-muted-foreground">{m.label}</p>

            {/* Bottom accent */}
            <div
              className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `linear-gradient(90deg, transparent, ${m.color}50, transparent)` }}
            />
          </motion.div>
        )
      })}
    </div>
  )
}
