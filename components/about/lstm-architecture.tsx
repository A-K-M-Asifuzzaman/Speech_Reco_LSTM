"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowDown, ChevronRight } from "lucide-react"

const layers = [
  {
    name: "Input Layer",
    description: "MFCC features (13 coefficients x T frames)",
    shape: "Shape: (batch, T, 13)",
    color: "#00d4ff",
    params: "0",
  },
  {
    name: "Bidirectional LSTM 1",
    description: "First recurrent layer with forward and backward passes",
    shape: "Output: (batch, T, 512)",
    color: "#10b981",
    params: "542,720",
  },
  {
    name: "Dropout Layer",
    description: "Regularization to prevent overfitting",
    shape: "Rate: 0.3",
    color: "#6b7280",
    params: "0",
  },
  {
    name: "Bidirectional LSTM 2",
    description: "Second recurrent layer for deeper temporal patterns",
    shape: "Output: (batch, T, 512)",
    color: "#a855f7",
    params: "1,576,960",
  },
  {
    name: "Attention Layer",
    description: "Self-attention mechanism to focus on important frames",
    shape: "Output: (batch, 512)",
    color: "#f59e0b",
    params: "262,656",
  },
  {
    name: "Dense Layer",
    description: "Fully connected layer with ReLU activation",
    shape: "Output: (batch, 128)",
    color: "#ef4444",
    params: "65,664",
  },
  {
    name: "Output Layer",
    description: "Softmax classification for 7 emotions",
    shape: "Output: (batch, 7)",
    color: "#ec4899",
    params: "903",
  },
]

export function LSTMArchitecture() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const totalParams = layers.reduce(
    (acc, layer) => acc + parseInt(layer.params.replace(/,/g, "") || "0"),
    0
  )

  return (
    <section ref={ref} className="mb-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-bold text-center mb-4"
      >
        LSTM <span className="text-primary">Architecture</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
      >
        Layer-by-layer breakdown of our neural network architecture with{" "}
        <span className="text-primary font-mono">
          {totalParams.toLocaleString()}
        </span>{" "}
        trainable parameters.
      </motion.p>

      <div className="max-w-3xl mx-auto space-y-4">
        {layers.map((layer, index) => (
          <motion.div
            key={layer.name}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <motion.div
              whileHover={{ x: 10, transition: { duration: 0.2 } }}
              className="glass-card rounded-xl p-5 border border-border/50 hover:border-primary/30 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className="w-3 h-3 rounded-full mt-1.5 shrink-0"
                    style={{ backgroundColor: layer.color }}
                  />
                  <div>
                    <h4 className="font-semibold" style={{ color: layer.color }}>
                      {layer.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">{layer.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm pl-7 sm:pl-0">
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground block">Shape</span>
                    <span className="font-mono text-xs">{layer.shape}</span>
                  </div>
                  <div className="text-right min-w-[80px]">
                    <span className="text-xs text-muted-foreground block">Params</span>
                    <span className="font-mono text-xs" style={{ color: layer.color }}>
                      {layer.params}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {index < layers.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="flex justify-center py-2"
              >
                <ArrowDown className="w-5 h-5 text-primary/50" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Summary card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-8 max-w-3xl mx-auto"
      >
        <div className="glass-card rounded-xl p-6 border border-primary/30 neon-glow">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="font-semibold text-primary">Total Architecture</h4>
              <p className="text-sm text-muted-foreground">
                Optimized for real-time emotion recognition
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <span className="text-2xl font-bold text-primary">
                  {totalParams.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground block">Parameters</span>
              </div>
              <div className="text-center">
                <span className="text-2xl font-bold text-chart-3">~9.5</span>
                <span className="text-xs text-muted-foreground block">MB Model</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
