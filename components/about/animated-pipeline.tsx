"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Mic, Activity, BarChart2, Layers, Brain, Heart, ArrowDown } from "lucide-react"

const steps = [
  {
    icon: Mic,
    title: "Audio Input",
    description: "Raw speech signal at 16kHz sampling rate",
    details: ["Waveform representation", "Time-domain signal", "Variable length input"],
    color: "#00d4ff",
  },
  {
    icon: Activity,
    title: "Pre-processing",
    description: "Signal normalization and noise reduction",
    details: ["Amplitude normalization", "Silence trimming", "High-pass filtering"],
    color: "#10b981",
  },
  {
    icon: BarChart2,
    title: "MFCC Extraction",
    description: "13 Mel-frequency cepstral coefficients",
    details: ["Windowing (25ms)", "FFT computation", "Mel filterbank"],
    color: "#f59e0b",
  },
  {
    icon: Layers,
    title: "Spectrogram",
    description: "Mel spectrogram for frequency analysis",
    details: ["128 Mel bands", "Time-frequency map", "Log compression"],
    color: "#a855f7",
  },
  {
    icon: Brain,
    title: "LSTM Network",
    description: "Bidirectional LSTM with attention mechanism",
    details: ["256 hidden units", "2 LSTM layers", "Dropout 0.3"],
    color: "#ef4444",
  },
  {
    icon: Heart,
    title: "Emotion Output",
    description: "Probability distribution across 7 emotions",
    details: ["Softmax activation", "Confidence scores", "Top-1 prediction"],
    color: "#ec4899",
  },
]

export function AnimatedPipeline() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="mb-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-bold text-center mb-3"
      >
        The Processing <span className="text-primary">Pipeline</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-muted-foreground text-sm mb-12"
      >
        From raw audio waveform to emotional insight in 6 steps
      </motion.p>

      <div className="relative">
        {/* Flowing connection line (desktop) */}
        <div className="hidden xl:block absolute top-[3.2rem] left-[4%] right-[4%] h-0.5 overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="h-full origin-left"
            style={{ background: "linear-gradient(90deg, transparent, oklch(0.76 0.20 195 / 0.45) 20%, oklch(0.76 0.20 195 / 0.45) 80%, transparent)" }}
          />
        </div>

        {/* Animated packet */}
        {isInView && (
          <div className="hidden xl:block absolute top-[3.2rem] left-[4%] right-[4%] h-0.5 overflow-hidden pointer-events-none">
            {[0, 1].map((i) => (
              <motion.div
                key={i}
                className="absolute h-full"
                style={{ width: "80px" }}
                initial={{ left: "-80px" }}
                animate={{ left: "calc(100% + 80px)" }}
                transition={{ duration: 3, delay: 0.8 + i * 1.5, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
              >
                <div
                  className="h-full w-full"
                  style={{ background: "linear-gradient(90deg, transparent, oklch(0.82 0.22 195), transparent)" }}
                />
              </motion.div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-5">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 32, scale: 0.92 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: i * 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <motion.div
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="glass-card rounded-2xl p-5 border border-border/40 hover:border-primary/28 transition-colors duration-300 h-full relative overflow-hidden group"
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${step.color}0c 0%, transparent 65%)` }}
                  />

                  {/* Icon */}
                  <motion.div
                    animate={{
                      boxShadow: [
                        `0 0 10px ${step.color}35`,
                        `0 0 22px ${step.color}55`,
                        `0 0 10px ${step.color}35`,
                      ],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.25 }}
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${step.color}18`, border: `1.5px solid ${step.color}40` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: step.color }} />
                  </motion.div>

                  {/* Step number */}
                  <div
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{ background: step.color, color: "#0a0a18" }}
                  >
                    {i + 1}
                  </div>

                  <h3 className="font-semibold text-sm mb-1.5">{step.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{step.description}</p>

                  <ul className="space-y-1.5">
                    {step.details.map((d) => (
                      <li key={d} className="flex items-center gap-1.5 text-xs text-muted-foreground/80">
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ background: step.color }} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Mobile arrow */}
                {i < steps.length - 1 && (
                  <div className="flex justify-center py-1 xl:hidden">
                    <ArrowDown className="w-4 h-4 text-primary/35" />
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
