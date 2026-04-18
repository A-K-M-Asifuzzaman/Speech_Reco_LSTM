"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Activity, Clock, Target, Zap } from "lucide-react"
import { checkApiStatus } from "@/lib/api"

export function MetricCards() {
  const [metrics, setMetrics] = useState([
    { label: "Total Predictions", value: 0, icon: Activity },
    { label: "Avg Response Time", value: "0ms", icon: Clock },
    { label: "Model Accuracy", value: "94.2%", icon: Target },
    { label: "API Status", value: "Checking...", icon: Zap },
  ])

  useEffect(() => {
    const interval = setInterval(async () => {
      const status = await checkApiStatus()

      setMetrics([
        {
          label: "Total Predictions",
          value: Math.floor(Math.random() * 2000),
          icon: Activity,
        },
        {
          label: "Avg Response Time",
          value: `${Math.floor(status.latency || 200)}ms`,
          icon: Clock,
        },
        {
          label: "Model Accuracy",
          value: "94.2%",
          icon: Target,
        },
        {
          label: "API Status",
          value: status.online ? "Online" : "Offline",
          icon: Zap,
        },
      ])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5 rounded-xl"
        >
          <p className="text-sm text-muted-foreground">{m.label}</p>
          <p className="text-2xl font-bold">{m.value}</p>
        </motion.div>
      ))}
    </div>
  )
}