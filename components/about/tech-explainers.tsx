"use client"

import { motion } from "framer-motion"
import { Activity, BarChart2, Brain, Target } from "lucide-react"

const techCards = [
  {
    icon: Activity,
    title: "MFCC (Mel-Frequency Cepstral Coefficients)",
    description:
      "MFCCs are features that capture the spectral characteristics of speech. They mimic how the human ear perceives sound by using a mel scale that approximates human auditory perception.",
    details: [
      "13 coefficients extracted per frame",
      "25ms window with 10ms hop",
      "Captures vocal tract shape",
      "Robust to noise variations",
    ],
    formula: "MFCC = DCT(log(|FFT(windowed signal)|))",
    color: "#00d4ff",
  },
  {
    icon: BarChart2,
    title: "Mel Spectrogram",
    description:
      "A visual representation of the audio signal showing how frequencies change over time, converted to the mel scale for better alignment with human perception of pitch.",
    details: [
      "128 mel frequency bands",
      "Log-scaled magnitudes",
      "Time-frequency representation",
      "Captures prosodic features",
    ],
    formula: "Mel(f) = 2595 * log10(1 + f/700)",
    color: "#a855f7",
  },
  {
    icon: Brain,
    title: "LSTM (Long Short-Term Memory)",
    description:
      "A type of recurrent neural network capable of learning long-term dependencies in sequential data. Perfect for analyzing the temporal patterns in speech that convey emotion.",
    details: [
      "Bidirectional processing",
      "256 hidden units per layer",
      "Attention mechanism",
      "Handles variable-length input",
    ],
    formula: "h_t = o_t * tanh(c_t)",
    color: "#ef4444",
  },
  {
    icon: Target,
    title: "Emotion Classification",
    description:
      "The final layer uses softmax activation to produce a probability distribution across seven emotion classes, enabling confident and interpretable predictions.",
    details: [
      "7 emotion classes",
      "Softmax output layer",
      "Cross-entropy loss",
      "Class-weighted training",
    ],
    formula: "P(emotion) = softmax(Wx + b)",
    color: "#10b981",
  },
]

export function TechExplainers() {
  return (
    <section className="mb-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-bold text-center mb-12"
      >
        Core <span className="text-primary">Technologies</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {techCards.map((card, index) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glass-card rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${card.color}20`, border: `1px solid ${card.color}50` }}
                >
                  <Icon className="w-6 h-6" style={{ color: card.color }} />
                </motion.div>
                <h3 className="font-semibold text-lg">{card.title}</h3>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{card.description}</p>

              <div className="grid grid-cols-2 gap-2 mb-4">
                {card.details.map((detail) => (
                  <div
                    key={detail}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: card.color }}
                    />
                    {detail}
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg bg-secondary/50 font-mono text-xs text-center overflow-x-auto">
                <code style={{ color: card.color }}>{card.formula}</code>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
