"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Mic, Activity, BarChart2, Brain, Heart, ChevronRight } from "lucide-react"

const pipelineSteps = [
  {
    icon: Mic,
    label: "Audio Input",
    description: "Raw signal",
    color: "#00d4ff",
    delay: 0,
  },
  {
    icon: Activity,
    label: "MFCC",
    description: "Feature extraction",
    color: "#a855f7",
    delay: 0.15,
  },
  {
    icon: BarChart2,
    label: "Spectrogram",
    description: "Frequency analysis",
    color: "#f59e0b",
    delay: 0.3,
  },
  {
    icon: Brain,
    label: "LSTM",
    description: "Neural network",
    color: "#ef4444",
    delay: 0.45,
  },
  {
    icon: Heart,
    label: "Emotion",
    description: "Prediction output",
    color: "#10b981",
    delay: 0.6,
  },
]

export function PipelineStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 border-y border-border/40 bg-secondary/10 backdrop-blur-sm" />
      <div className="absolute inset-0 grid-pattern-fine opacity-30 pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-2xl md:text-3xl font-bold">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-muted-foreground text-sm mt-2">
            5-stage processing pipeline from raw audio to emotion
          </p>
        </motion.div>

        <div className="relative">
          {/* Animated connection line (desktop) */}
          <div className="hidden md:block absolute top-[2.4rem] left-[10%] right-[10%] h-px overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-full origin-left"
              style={{
                background: "linear-gradient(90deg, transparent, oklch(0.76 0.20 195 / 0.5) 20%, oklch(0.76 0.20 195 / 0.5) 80%, transparent)",
              }}
            />
          </div>

          {/* Animated data packet (desktop) */}
          {isInView && (
            <div className="hidden md:block absolute top-[2.4rem] left-[10%] right-[10%] h-px pointer-events-none overflow-hidden">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute top-0 h-full"
                  style={{ width: "60px" }}
                  initial={{ left: "-60px" }}
                  animate={{ left: "calc(100% + 60px)" }}
                  transition={{
                    duration: 2.5,
                    delay: i * 0.9,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                    ease: "easeInOut",
                  }}
                >
                  <div
                    className="h-full w-full"
                    style={{
                      background: "linear-gradient(90deg, transparent, oklch(0.82 0.22 195 / 0.9), transparent)",
                    }}
                  />
                </motion.div>
              ))}
            </div>
          )}

          {/* Steps */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
            {pipelineSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 24, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ delay: step.delay, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex flex-col md:flex-row items-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.08, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center relative z-10 group"
                  >
                    {/* Node */}
                    <motion.div
                      animate={{
                        boxShadow: [
                          `0 0 12px ${step.color}40`,
                          `0 0 28px ${step.color}60`,
                          `0 0 12px ${step.color}40`,
                        ],
                      }}
                      transition={{ duration: 2.2, repeat: Infinity, delay: step.delay }}
                      className="w-18 h-18 rounded-2xl glass-card flex items-center justify-center mb-3 relative overflow-hidden"
                      style={{ border: `1.5px solid ${step.color}45` }}
                    >
                      {/* Inner glow */}
                      <div
                        className="absolute inset-0 opacity-30 rounded-2xl"
                        style={{ background: `radial-gradient(circle, ${step.color}30 0%, transparent 70%)` }}
                      />
                      <Icon className="w-7 h-7 relative z-10" style={{ color: step.color }} />
                    </motion.div>

                    {/* Step number */}
                    <div
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold z-20"
                      style={{ backgroundColor: step.color, color: "#0a0a18" }}
                    >
                      {index + 1}
                    </div>

                    <span className="text-sm font-semibold">{step.label}</span>
                    <span className="text-xs text-muted-foreground mt-0.5">{step.description}</span>
                  </motion.div>

                  {/* Arrow (desktop between items) */}
                  {index < pipelineSteps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: step.delay + 0.3 }}
                      className="hidden md:flex items-center mx-3"
                    >
                      <ChevronRight className="w-4 h-4 text-primary/35" />
                    </motion.div>
                  )}

                  {/* Arrow (mobile vertical) */}
                  {index < pipelineSteps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: step.delay + 0.3 }}
                      className="md:hidden my-1"
                    >
                      <ChevronRight className="w-4 h-4 text-primary/35 rotate-90" />
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
