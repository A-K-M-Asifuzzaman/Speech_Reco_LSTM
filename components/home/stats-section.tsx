"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Award, Mic, Clock, Brain } from "lucide-react"

const stats = [
  {
    icon: Award,
    value: 94.2,
    unit: "%",
    label: "Model Accuracy",
    sub: "Weighted avg across all 7 emotions",
    color: "#00d4ff",
    decimals: 1,
    duration: 1.8,
  },
  {
    icon: Mic,
    value: 7,
    unit: "",
    label: "Emotions Detected",
    sub: "Happy · Sad · Angry · Neutral · Fear · Surprise · Disgust",
    color: "#a855f7",
    decimals: 0,
    duration: 1.0,
  },
  {
    icon: Clock,
    value: 250,
    unit: "ms",
    label: "Inference Speed",
    sub: "Average end-to-end latency",
    color: "#10b981",
    decimals: 0,
    duration: 1.4,
  },
  {
    icon: Brain,
    value: 2.4,
    unit: "M",
    label: "Parameters",
    sub: "Trainable neural network weights",
    color: "#f59e0b",
    decimals: 1,
    duration: 1.6,
  },
]

function CountUp({
  target,
  decimals,
  duration,
  started,
}: {
  target: number
  decimals: number
  duration: number
  started: boolean
}) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!started) return
    let animId: number
    const startTime = performance.now()
    const startVal = 0

    const update = (now: number) => {
      const elapsed = (now - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCurrent(startVal + (target - startVal) * ease)
      if (progress < 1) animId = requestAnimationFrame(update)
      else setCurrent(target)
    }

    animId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(animId)
  }, [started, target, duration])

  return (
    <span>
      {decimals > 0 ? current.toFixed(decimals) : Math.floor(current)}
    </span>
  )
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="relative py-20 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/10 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Built for <span className="neon-text">Performance</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            State-of-the-art results on standard speech emotion benchmarks.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, transition: { duration: 0.22 } }}
                className="glass-card rounded-2xl p-5 md:p-6 border border-border/40 hover:border-primary/25 transition-colors duration-300 relative overflow-hidden group"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{
                    background: `radial-gradient(ellipse at 50% 100%, ${stat.color}0d 0%, transparent 70%)`,
                  }}
                />

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ duration: 0.25 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: `${stat.color}1a`,
                    border: `1px solid ${stat.color}35`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: stat.color }} />
                </motion.div>

                {/* Value */}
                <div
                  className="text-3xl md:text-4xl font-bold font-mono mb-1 tabular-nums"
                  style={{ color: stat.color }}
                >
                  <CountUp
                    target={stat.value}
                    decimals={stat.decimals}
                    duration={stat.duration}
                    started={isInView}
                  />
                  <span className="text-xl md:text-2xl">{stat.unit}</span>
                </div>

                <div className="font-semibold text-sm mb-1.5">{stat.label}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">{stat.sub}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
