"use client"

import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

const emotionAccuracy = [
  { emotion: "Neutral", accuracy: 96.2, color: "#6b7280" },
  { emotion: "Happy", accuracy: 94.8, color: "#00d4ff" },
  { emotion: "Sad", accuracy: 93.1, color: "#a855f7" },
  { emotion: "Angry", accuracy: 92.5, color: "#ef4444" },
  { emotion: "Surprise", accuracy: 91.8, color: "#10b981" },
  { emotion: "Fear", accuracy: 89.4, color: "#f59e0b" },
  { emotion: "Disgust", accuracy: 87.6, color: "#8b5cf6" },
]

const benchmarks = [
  { metric: "Overall Accuracy", value: "94.2%", description: "Weighted average across all emotions" },
  { metric: "F1 Score", value: "0.93", description: "Harmonic mean of precision and recall" },
  { metric: "Inference Time", value: "~250ms", description: "Average prediction latency" },
  { metric: "Training Dataset", value: "10K+ samples", description: "Diverse emotional speech data" },
]

export function PerformanceBenchmarks() {
  return (
    <section>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-bold text-center mb-4"
      >
        Performance <span className="text-primary">Benchmarks</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
      >
        Our model achieves state-of-the-art performance on standard emotion recognition datasets.
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Accuracy by Emotion Chart */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-xl p-6 border border-border/50"
        >
          <h3 className="font-semibold mb-4">Accuracy by Emotion</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={emotionAccuracy} layout="vertical" margin={{ left: 20, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.03 260)" />
              <XAxis
                type="number"
                domain={[80, 100]}
                stroke="oklch(0.6 0.02 260)"
                fontSize={12}
                tickFormatter={(v) => `${v}%`}
              />
              <YAxis
                type="category"
                dataKey="emotion"
                stroke="oklch(0.6 0.02 260)"
                fontSize={12}
                width={70}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.12 0.015 260)",
                  border: "1px solid oklch(0.25 0.03 260)",
                  borderRadius: "8px",
                  color: "oklch(0.95 0 0)",
                }}
                formatter={(value: number) => [`${value}%`, "Accuracy"]}
              />
              <Bar dataKey="accuracy" radius={[0, 4, 4, 0]}>
                {emotionAccuracy.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Benchmark Metrics */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {benchmarks.map((benchmark, index) => (
            <motion.div
              key={benchmark.metric}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-xl p-5 border border-border/50 hover:border-primary/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{benchmark.metric}</h4>
                  <p className="text-sm text-muted-foreground">{benchmark.description}</p>
                </div>
                <span className="text-2xl font-bold text-primary font-mono">
                  {benchmark.value}
                </span>
              </div>
            </motion.div>
          ))}

          {/* Training Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-xl p-5 border border-primary/30"
          >
            <h4 className="font-semibold mb-3 text-primary">Training Configuration</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Optimizer:</span>
                <span className="ml-2 font-mono">Adam</span>
              </div>
              <div>
                <span className="text-muted-foreground">Learning Rate:</span>
                <span className="ml-2 font-mono">1e-4</span>
              </div>
              <div>
                <span className="text-muted-foreground">Batch Size:</span>
                <span className="ml-2 font-mono">32</span>
              </div>
              <div>
                <span className="text-muted-foreground">Epochs:</span>
                <span className="ml-2 font-mono">100</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
