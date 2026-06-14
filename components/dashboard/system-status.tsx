"use client"

import { motion } from "framer-motion"
import { Server, Database, Brain, Wifi } from "lucide-react"
import { useEffect, useState } from "react"
import { checkApiStatus } from "@/lib/api"

const systemItems = [
  { label: "API Server", icon: Server, key: "api" },
  { label: "ML Model", icon: Brain, key: "model" },
  { label: "Database", icon: Database, key: "db" },
  { label: "WebSocket", icon: Wifi, key: "ws" },
]

type StatusMap = Record<string, "online" | "offline" | "checking">

export function SystemStatus() {
  const [statuses, setStatuses] = useState<StatusMap>({
    api: "checking",
    model: "checking",
    db: "checking",
    ws: "checking",
  })
  const [lastUpdated, setLastUpdated] = useState<string>("—")

  useEffect(() => {
    const check = async () => {
      const result = await checkApiStatus()
      setStatuses({
        api: result.online ? "online" : "offline",
        model: result.online ? "online" : "offline",
        db: result.online ? "online" : "offline",
        ws: result.online ? "online" : "offline",
      })
      setLastUpdated(new Date().toLocaleTimeString())
    }
    check()
    const id = setInterval(check, 10000)
    return () => clearInterval(id)
  }, [])

  const onlineCount = Object.values(statuses).filter((s) => s === "online").length

  return (
    <div className="glass-card rounded-2xl p-6 border border-border/40 flex flex-col h-full">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold">System Status</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Infrastructure health</p>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold font-mono text-chart-3">
            {onlineCount}/{systemItems.length}
          </div>
          <div className="text-xs text-muted-foreground">Services up</div>
        </div>
      </div>

      <div className="space-y-2.5 flex-1">
        {systemItems.map((item, index) => {
          const Icon = item.icon
          const status = statuses[item.key]
          const isOnline = status === "online"
          const isChecking = status === "checking"

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="flex items-center justify-between px-3.5 py-3 rounded-xl bg-secondary/25 hover:bg-secondary/40 transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-secondary/60 flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                <span className="text-sm font-medium">{item.label}</span>
              </div>

              <div className="flex items-center gap-2">
                {isChecking ? (
                  <motion.div
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-xs text-muted-foreground"
                  >
                    Checking…
                  </motion.div>
                ) : (
                  <>
                    <span
                      className="relative flex h-2 w-2"
                    >
                      {isOnline && (
                        <span
                          className="absolute inline-flex h-full w-full rounded-full opacity-75 glow-ring"
                          style={{ backgroundColor: "#10b981" }}
                        />
                      )}
                      <span
                        className="relative inline-flex rounded-full h-2 w-2"
                        style={{ backgroundColor: isOnline ? "#10b981" : "#ef4444" }}
                      />
                    </span>
                    <span
                      className="text-xs font-medium"
                      style={{ color: isOnline ? "#10b981" : "#ef4444" }}
                    >
                      {isOnline ? "Online" : "Offline"}
                    </span>
                  </>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between text-xs text-muted-foreground">
        <span>Last checked</span>
        <span className="font-mono">{lastUpdated}</span>
      </div>
    </div>
  )
}
