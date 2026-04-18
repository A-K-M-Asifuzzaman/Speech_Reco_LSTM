"use client"

import { motion } from "framer-motion"
import { AnimatedPipeline } from "@/components/about/animated-pipeline"
import { TechExplainers } from "@/components/about/tech-explainers"
import { LSTMArchitecture } from "@/components/about/lstm-architecture"
import { PerformanceBenchmarks } from "@/components/about/performance-benchmarks"

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 grid-pattern opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
            How <span className="text-primary neon-text">EmotiVoice</span> Works
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Dive deep into the technology behind our advanced speech emotion recognition system.
            Understand the pipeline from raw audio to emotional insights.
          </p>
        </motion.div>

        {/* Animated Pipeline */}
        <AnimatedPipeline />

        {/* Tech Explainer Cards */}
        <TechExplainers />

        {/* LSTM Architecture Breakdown */}
        <LSTMArchitecture />

        {/* Performance Benchmarks */}
        <PerformanceBenchmarks />
      </div>
    </div>
  )
}
