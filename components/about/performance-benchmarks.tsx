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
  { metric: "Overall Accuracy", value: "94.2%", color: "#00d4ff", description: "Weighted average across all emotions" },
  { metric: "F1 Score", value: "0.93", color: "#10b981", description: "Harmonic mean of precision and recall" },
  { metric: "Inference Time", value: "~250ms", color: "#a855f7", description: "Average prediction latency" },
  { metric: "Training Data", value: "10K+", color: "#f59e0b", description: "Diverse emotional speech samples" },
]

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card rounded-xl px-4 py-3 border border-border/50 text-sm">
      <p className="text-muted-foreground text-xs mb-1">{label}</p>
      <p className="font-bold font-mono" style={{ color: payload[0].fill }}>
        {payload[0].value}%
      </p>
    </div>
  )
}

export function PerformanceBenchmarks() {
  return (
    <section>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-bold text-center mb-3"
      >
        Performance <span className="text-primary">Benchmarks</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-muted-foreground text-sm mb-12"
      >
        State-of-the-art results on standard emotion recognition datasets
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar chart */}
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card rounded-2xl p-6 border border-border/40"
        >
          <h3 className="font-semibold mb-1">Accuracy by Emotion</h3>
          <p className="text-xs text-muted-foreground mb-5">Per-class classification accuracy</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={emotionAccuracy} layout="vertical" margin={{ left: 8, right: 20, top: 4, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.025 260)" strokeOpacity={0.5} horizontal={false} />
              <XAxis
                type="number"
                domain={[80, 100]}
                stroke="oklch(0.54 0.02 260)"
                fontSize={11}
                tickFormatter={(v) => `${v}%`}
                tick={{ fill: "oklch(0.54 0.02 260)" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                type="category"
                dataKey="emotion"
                stroke="oklch(0.54 0.02 260)"
                fontSize={12}
                width={62}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "oklch(0.54 0.02 260)" }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "oklch(0.22 0.025 260 / 0.4)" }} />
              <Bar dataKey="accuracy" radius={[0, 6, 6, 0]} maxBarSize={22}>
                {emotionAccuracy.map((entry, i) => (
                  <Cell key={i} fill={entry.color} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Metrics + config */}
        <div className="space-y-4">
          {/* Metric cards */}
          <div className="grid grid-cols-2 gap-3">
            {benchmarks.map((b, i) => (
              <motion.div
                key={b.metric}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="glass-card rounded-xl p-4 border border-border/40 hover:border-primary/22 transition-colors duration-300 relative overflow-hidden group"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-xl"
                  style={{ background: `radial-gradient(ellipse at 50% 100%, ${b.color}08 0%, transparent 60%)` }}
                />
                <div className="text-2xl font-bold font-mono mb-1" style={{ color: b.color }}>
                  {b.value}
                </div>
                <div className="text-xs font-semibold mb-0.5">{b.metric}</div>
                <div className="text-[10px] text-muted-foreground leading-relaxed">{b.description}</div>
              </motion.div>
            ))}
          </div>

          {/* Training config */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="glass-card rounded-xl p-5 border border-primary/22"
          >
            <h4 className="font-semibold text-sm text-primary mb-4">Training Configuration</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Optimizer", value: "Adam" },
                { label: "Learning Rate", value: "1e-4" },
                { label: "Batch Size", value: "32" },
                { label: "Epochs", value: "100" },
                { label: "Dataset", value: "RAVDESS" },
                { label: "Val Split", value: "20%" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-mono font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
