"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Circle, Server, Database, Brain, Wifi } from "lucide-react"

const statusItems = [
  { label: "API Server", status: "online", icon: Server },
  { label: "ML Model", status: "online", icon: Brain },
  { label: "Database", status: "online", icon: Database },
  { label: "WebSocket", status: "online", icon: Wifi },
]

export function SystemStatus() {
  return (
    <div className="glass-card rounded-xl p-6 border border-border/50 h-[300px]">
      <h3 className="text-lg font-semibold mb-4">System Status</h3>
      
      <div className="space-y-4">
        {statusItems.map((item, index) => {
          const Icon = item.icon
          const isOnline = item.status === "online"
          
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {isOnline ? (
                  <>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <CheckCircle2 className="w-4 h-4 text-chart-3" />
                    </motion.div>
                    <span className="text-xs text-chart-3">Online</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4 text-destructive" />
                    <span className="text-xs text-destructive">Offline</span>
                  </>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-border/50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Last updated</span>
          <span className="font-mono text-xs">Just now</span>
        </div>
      </div>
    </div>
  )
}
