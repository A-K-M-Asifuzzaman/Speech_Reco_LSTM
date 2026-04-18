"use client"

import { motion } from "framer-motion"
import { MetricCards } from "@/components/dashboard/metric-cards"
import { AccuracyChart } from "@/components/dashboard/accuracy-chart"
import { EmotionDistribution } from "@/components/dashboard/emotion-distribution"
import { ResponseTimeChart } from "@/components/dashboard/response-time-chart"
import { PredictionHistory } from "@/components/dashboard/prediction-history"
import { SystemStatus } from "@/components/dashboard/system-status"

export default function DashboardPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      {/* Background */}
      <div className="fixed inset-0 grid-pattern opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Analytics <span className="text-primary neon-text">Dashboard</span>
          </h1>
          <p className="text-muted-foreground">
            Monitor your emotion recognition system performance and insights.
          </p>
        </motion.div>

        {/* Metric Cards */}
        <MetricCards />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <AccuracyChart />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <EmotionDistribution />
          </motion.div>
        </div>

        {/* Response Time & System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <ResponseTimeChart />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <SystemStatus />
          </motion.div>
        </div>

        {/* Prediction History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <PredictionHistory />
        </motion.div>
      </div>
    </div>
  )
}
