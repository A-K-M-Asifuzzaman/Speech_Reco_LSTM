"use client"

import { motion } from "framer-motion"
import { Activity, BarChart2, Brain, Target } from "lucide-react"

const techCards = [
  {
    icon: Activity,
    title: "MFCC",
    subtitle: "Mel-Frequency Cepstral Coefficients",
    description:
      "MFCCs capture the spectral characteristics of speech using a mel scale that mimics human auditory perception — the gold standard for speech feature extraction.",
    details: [
      "13 coefficients per frame",
      "25ms window / 10ms hop",
      "Captures vocal tract shape",
      "Robust to noise variations",
    ],
    formula: "MFCC = DCT(log(|FFT(windowed signal)|))",
    color: "#00d4ff",
  },
  {
    icon: BarChart2,
    title: "Mel Spectrogram",
    subtitle: "Time-Frequency Representation",
    description:
      "A visual representation showing how frequencies change over time, converted to the mel scale for better alignment with human pitch perception.",
    details: [
      "128 mel frequency bands",
      "Log-scaled magnitudes",
      "Time-frequency map",
      "Captures prosodic features",
    ],
    formula: "Mel(f) = 2595 × log₁₀(1 + f/700)",
    color: "#a855f7",
  },
  {
    icon: Brain,
    title: "LSTM",
    subtitle: "Long Short-Term Memory",
    description:
      "A recurrent neural network capable of learning long-term temporal dependencies — ideal for analyzing emotional patterns across the full duration of speech.",
    details: [
      "Bidirectional processing",
      "256 hidden units / layer",
      "Attention mechanism",
      "Variable-length input",
    ],
    formula: "h_t = o_t ⊙ tanh(c_t)",
    color: "#ef4444",
  },
  {
    icon: Target,
    title: "Classification",
    subtitle: "Softmax Emotion Output",
    description:
      "The final layer produces a probability distribution across 7 emotion classes using softmax activation, enabling interpretable, confidence-scored predictions.",
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
        className="text-2xl md:text-3xl font-bold text-center mb-3"
      >
        Core <span className="text-primary">Technologies</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-muted-foreground text-sm mb-12"
      >
        The science powering every prediction
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {techCards.map((card, i) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glass-card rounded-2xl p-6 border border-border/40 hover:border-primary/25 transition-colors duration-300 relative overflow-hidden group"
            >
              {/* Hover ambient */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(ellipse at 0% 100%, ${card.color}0a 0%, transparent 60%)` }}
              />

              <div className="flex items-start gap-4 mb-4">
                <motion.div
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ duration: 0.25 }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${card.color}18`, border: `1.5px solid ${card.color}40` }}
                >
                  <Icon className="w-6 h-6" style={{ color: card.color }} />
                </motion.div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">{card.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{card.subtitle}</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{card.description}</p>

              <div className="grid grid-cols-2 gap-2 mb-4">
                {card.details.map((d) => (
                  <div key={d} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: card.color }} />
                    {d}
                  </div>
                ))}
              </div>

              {/* Formula */}
              <div
                className="px-4 py-3 rounded-xl text-xs font-mono text-center overflow-x-auto"
                style={{
                  background: `${card.color}0c`,
                  border: `1px solid ${card.color}25`,
                  color: card.color,
                }}
              >
                {card.formula}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
