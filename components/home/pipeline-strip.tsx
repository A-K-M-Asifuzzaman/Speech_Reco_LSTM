"use client"

import { motion } from "framer-motion"
import { Mic, Activity, BarChart2, Brain, Heart, ChevronRight } from "lucide-react"

const pipelineSteps = [
  { icon: Mic, label: "Audio Input", description: "Raw audio signal" },
  { icon: Activity, label: "MFCC", description: "Feature extraction" },
  { icon: BarChart2, label: "Spectrogram", description: "Frequency analysis" },
  { icon: Brain, label: "LSTM", description: "Neural network" },
  { icon: Heart, label: "Emotion", description: "Prediction output" },
]

export function PipelineStrip() {
  return (
    <section className="py-16 px-4 border-y border-border/50 bg-secondary/20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-2xl md:text-3xl font-bold mb-12"
        >
          How It <span className="text-primary">Works</span>
        </motion.h2>

        <div className="relative flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-px bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0" />

          {pipelineSteps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative flex items-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative z-10 flex flex-col items-center"
                >
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(0, 212, 255, 0.3)",
                        "0 0 40px rgba(0, 212, 255, 0.5)",
                        "0 0 20px rgba(0, 212, 255, 0.3)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    className="w-16 h-16 rounded-xl glass-card border border-primary/30 flex items-center justify-center"
                  >
                    <Icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  <span className="mt-3 text-sm font-medium">{step.label}</span>
                  <span className="text-xs text-muted-foreground">{step.description}</span>
                </motion.div>

                {index < pipelineSteps.length - 1 && (
                  <ChevronRight className="hidden md:block mx-4 w-5 h-5 text-primary/50" />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
