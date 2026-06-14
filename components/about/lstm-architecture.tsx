"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowDown } from "lucide-react"

const layers = [
  { name: "Input Layer", description: "MFCC features (13 coefficients × T frames)", shape: "(batch, T, 13)", color: "#00d4ff", params: "0" },
  { name: "Bidirectional LSTM 1", description: "First recurrent layer — forward + backward passes", shape: "(batch, T, 512)", color: "#10b981", params: "542,720" },
  { name: "Dropout (0.3)", description: "Regularization to prevent overfitting", shape: "Rate: 0.3", color: "#6b7280", params: "0" },
  { name: "Bidirectional LSTM 2", description: "Second recurrent layer for deeper temporal patterns", shape: "(batch, T, 512)", color: "#a855f7", params: "1,576,960" },
  { name: "Attention Layer", description: "Self-attention to focus on emotionally salient frames", shape: "(batch, 512)", color: "#f59e0b", params: "262,656" },
  { name: "Dense (ReLU)", description: "Fully connected layer for feature compression", shape: "(batch, 128)", color: "#ef4444", params: "65,664" },
  { name: "Output (Softmax)", description: "Probability distribution across 7 emotion classes", shape: "(batch, 7)", color: "#ec4899", params: "903" },
]

export function LSTMArchitecture() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const totalParams = layers.reduce((acc, l) => acc + parseInt(l.params.replace(/,/g, "") || "0"), 0)

  return (
    <section ref={ref} className="mb-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-bold text-center mb-3"
      >
        LSTM <span className="text-primary">Architecture</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-muted-foreground text-sm mb-12 max-w-2xl mx-auto"
      >
        Layer-by-layer breakdown with{" "}
        <span className="text-primary font-mono font-semibold">{totalParams.toLocaleString()}</span>{" "}
        trainable parameters
      </motion.p>

      <div className="max-w-3xl mx-auto space-y-3">
        {layers.map((layer, i) => (
          <motion.div key={layer.name}>
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ x: 8, transition: { duration: 0.2 } }}
              className="glass-card rounded-xl px-5 py-4 border border-border/40 hover:border-primary/25 transition-colors duration-300 relative overflow-hidden group"
            >
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
                style={{ background: layer.color }}
              />

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-xl"
                style={{ background: `radial-gradient(ellipse at 0% 50%, ${layer.color}08 0%, transparent 55%)` }}
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pl-3">
                <div className="flex items-start gap-3">
                  <div
                    className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0"
                    style={{ background: layer.color, boxShadow: `0 0 8px ${layer.color}70` }}
                  />
                  <div>
                    <h4 className="font-semibold text-sm" style={{ color: layer.color }}>
                      {layer.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{layer.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-5 text-xs pl-5 sm:pl-0 shrink-0">
                  <div className="text-right">
                    <span className="text-muted-foreground block text-[10px] uppercase tracking-wider mb-0.5">Shape</span>
                    <span className="font-mono">{layer.shape}</span>
                  </div>
                  <div className="text-right min-w-[72px]">
                    <span className="text-muted-foreground block text-[10px] uppercase tracking-wider mb-0.5">Params</span>
                    <span className="font-mono font-semibold" style={{ color: layer.color }}>
                      {layer.params}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {i < layers.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.1 + 0.25 }}
                className="flex justify-center py-1.5"
              >
                <motion.div
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
                >
                  <ArrowDown className="w-4 h-4 text-primary/35" />
                </motion.div>
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
        className="mt-6 max-w-3xl mx-auto"
      >
        <div className="glass-card rounded-2xl p-6 border border-primary/25 neon-glow">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="font-bold text-primary">Total Architecture</h4>
              <p className="text-sm text-muted-foreground mt-0.5">
                Optimized for real-time emotion recognition
              </p>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold font-mono text-primary">
                  {totalParams.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">Parameters</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold font-mono text-chart-3">~9.5</div>
                <div className="text-xs text-muted-foreground mt-0.5">MB Model</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold font-mono text-chart-2">7</div>
                <div className="text-xs text-muted-foreground mt-0.5">Layers</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
