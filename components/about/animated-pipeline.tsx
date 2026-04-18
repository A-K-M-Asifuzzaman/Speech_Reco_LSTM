"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Mic, Activity, BarChart2, Layers, Brain, Heart, ArrowRight } from "lucide-react"

const pipelineSteps = [
  {
    icon: Mic,
    title: "Audio Input",
    description: "Raw speech signal captured at 16kHz sampling rate",
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
    description: "13 Mel-frequency cepstral coefficients extracted",
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
    description: "Probability distribution across 7 emotion classes",
    details: ["Softmax activation", "Confidence scores", "Top-1 prediction"],
    color: "#ec4899",
  },
]

export function AnimatedPipeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="mb-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-bold text-center mb-12"
      >
        The Processing <span className="text-primary">Pipeline</span>
      </motion.h2>

      <div className="relative">
        {/* Connection line */}
        <div className="hidden lg:block absolute top-1/2 left-[5%] right-[5%] h-1 -translate-y-1/2">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 origin-left"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {pipelineSteps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="relative"
              >
                <motion.div
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="glass-card rounded-xl p-5 border border-border/50 hover:border-primary/30 transition-all h-full"
                >
                  {/* Node indicator */}
                  <motion.div
                    animate={{
                      boxShadow: [
                        `0 0 10px ${step.color}40`,
                        `0 0 25px ${step.color}60`,
                        `0 0 10px ${step.color}40`,
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${step.color}20`, border: `1px solid ${step.color}50` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: step.color }} />
                  </motion.div>

                  <h3 className="font-semibold mb-2 text-sm">{step.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{step.description}</p>

                  <ul className="space-y-1">
                    {step.details.map((detail) => (
                      <li key={detail} className="text-xs text-muted-foreground flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full" style={{ backgroundColor: step.color }} />
                        {detail}
                      </li>
                    ))}
                  </ul>

                  {/* Step number */}
                  <div
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: step.color, color: "#0a0a14" }}
                  >
                    {index + 1}
                  </div>
                </motion.div>

                {/* Arrow for mobile/tablet */}
                {index < pipelineSteps.length - 1 && (
                  <div className="flex justify-center my-2 xl:hidden">
                    <ArrowRight className="w-5 h-5 text-primary/50 rotate-90 md:rotate-0" />
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
