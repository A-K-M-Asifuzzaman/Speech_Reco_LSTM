"use client"

import { motion } from "framer-motion"
import { Zap, Shield, Waves, Activity, Brain, Clock, ArrowUpRight } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Real-time Analysis",
    description: "Process audio in milliseconds with our optimized LSTM architecture. Instant emotion detection with sub-250ms latency.",
    color: "#00d4ff",
    span: "col-span-1 md:col-span-2",
    large: true,
  },
  {
    icon: Brain,
    title: "Deep Learning",
    description: "Bidirectional LSTM with attention mechanism trained on 10K+ diverse emotional speech samples.",
    color: "#ef4444",
    span: "col-span-1",
    large: false,
  },
  {
    icon: Waves,
    title: "7 Emotions",
    description: "Happy, Sad, Angry, Neutral, Fear, Surprise, Disgust — all detected with high accuracy.",
    color: "#a855f7",
    span: "col-span-1",
    large: false,
  },
  {
    icon: Activity,
    title: "MFCC Features",
    description: "Advanced Mel-frequency cepstral coefficients extraction — the gold standard for audio analysis.",
    color: "#f59e0b",
    span: "col-span-1",
    large: false,
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Audio processed client-side. Nothing stored. Your voice stays yours.",
    color: "#10b981",
    span: "col-span-1 md:col-span-2",
    large: true,
  },
  {
    icon: Clock,
    title: "Batch Processing",
    description: "Analyze multiple audio files efficiently with our queue-based processing system.",
    color: "#00d4ff",
    span: "col-span-1",
    large: false,
  },
]

export function FeatureCards() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful <span className="text-primary">Features</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Built with cutting-edge technology for accurate and reliable emotion recognition.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className={feature.span}
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.22 }}
                  className="h-full group relative glass-card rounded-2xl p-6 md:p-7 border border-border/45 overflow-hidden cursor-default"
                >
                  {/* Animated corner gradient on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{
                      background: `radial-gradient(ellipse at 0% 0%, ${feature.color}0e 0%, transparent 60%)`,
                    }}
                  />

                  {/* Border glow on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{
                      boxShadow: `inset 0 0 0 1px ${feature.color}30`,
                    }}
                  />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        transition={{ duration: 0.25 }}
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: `${feature.color}18`,
                          border: `1px solid ${feature.color}35`,
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: feature.color }} />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 6 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                      </motion.div>
                    </div>

                    <h3 className={`font-bold mb-2 ${feature.large ? "text-xl" : "text-base"}`}>
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {feature.description}
                    </p>

                    {/* Bottom accent line */}
                    <motion.div
                      className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                      style={{ background: `linear-gradient(90deg, ${feature.color}60, transparent)` }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
