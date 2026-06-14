"use client"

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Sparkles, ChevronDown, Mic, Play } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const WAVEFORM_BARS = 64

const heroStats = [
  { value: "94.2%", label: "Accuracy" },
  { value: "7", label: "Emotions" },
  { value: "<250ms", label: "Latency" },
  { value: "LSTM", label: "Architecture" },
]

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const orb1X = useSpring(useTransform(mouseX, [0, 1], [-40, 40]), { stiffness: 40, damping: 30 })
  const orb1Y = useSpring(useTransform(mouseY, [0, 1], [-25, 25]), { stiffness: 40, damping: 30 })
  const orb2X = useSpring(useTransform(mouseX, [0, 1], [30, -30]), { stiffness: 28, damping: 25 })
  const orb2Y = useSpring(useTransform(mouseY, [0, 1], [20, -20]), { stiffness: 28, damping: 25 })
  const orb3X = useSpring(useTransform(mouseX, [0, 1], [-20, 20]), { stiffness: 20, damping: 20 })
  const orb3Y = useSpring(useTransform(mouseY, [0, 1], [15, -15]), { stiffness: 20, damping: 20 })

  useEffect(() => {
    setMounted(true)
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set((e.clientX - rect.left) / rect.width)
      mouseY.set((e.clientY - rect.top) / rect.height)
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const barHeights = mounted
    ? Array.from({ length: WAVEFORM_BARS }, (_, i) => ({
        min: 6 + Math.sin(i * 0.4) * 4,
        max: 24 + Math.sin(i * 0.3) * 28 + Math.random() * 18,
        delay: i * 0.022,
        duration: 0.7 + Math.random() * 0.7,
        isPink: i % 7 === 0 || i % 11 === 0,
      }))
    : []

  return (
    <section
      ref={containerRef}
      className="relative min-h-[96vh] flex flex-col items-center justify-center px-4 py-24 overflow-hidden"
    >
      {/* Aurora background */}
      <div className="absolute inset-0 aurora-bg" />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-35 pointer-events-none" />

      {/* Scan line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="scan-line absolute w-full" />
      </div>

      {/* Parallax orbs */}
      <motion.div
        style={{ x: orb1X, y: orb1Y }}
        className="absolute top-[15%] left-[12%] w-[520px] h-[520px] orb orb-primary opacity-55"
      />
      <motion.div
        style={{ x: orb2X, y: orb2Y }}
        className="absolute bottom-[18%] right-[10%] w-[420px] h-[420px] orb orb-accent opacity-45"
      />
      <motion.div
        style={{ x: orb3X, y: orb3Y }}
        className="absolute top-[55%] left-[55%] w-[280px] h-[280px] orb orb-green opacity-25"
      />

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center w-full">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex justify-center"
        >
          <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-card text-sm font-medium text-primary border border-primary/32 shadow-[0_0_24px_oklch(0.76_0.20_195/0.12)]">
            <motion.div
              animate={{ rotate: [0, 18, -18, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            >
              <Sparkles className="w-3.5 h-3.5" />
            </motion.div>
            Next-Gen Speech Emotion Analysis
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 glow-ring" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold mb-6 leading-[1.04] tracking-tight"
        >
          Decode Human
          <br />
          <span className="neon-text">Emotions</span>
          {" "}
          <span className="text-foreground/90">From</span>
          <br />
          <span className="text-foreground/90">Voice</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-lg lg:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Advanced bidirectional LSTM neural networks transform raw audio into emotional
          insights with{" "}
          <span className="text-primary font-semibold">94.2% accuracy</span>.
          No setup required.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-4 justify-center mb-14"
        >
          <Link href="/predict">
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 0 32px oklch(0.76 0.20 195 / 0.52)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base cursor-pointer transition-shadow duration-300"
              style={{ boxShadow: "0 0 18px oklch(0.76 0.20 195 / 0.28)" }}
            >
              <Mic className="w-4 h-4" />
              Try Prediction
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </Link>
          <Link href="/about">
            <motion.div
              whileHover={{ scale: 1.04, borderColor: "oklch(0.76 0.20 195 / 0.6)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl glass-card border border-primary/28 hover:bg-primary/10 font-semibold text-base cursor-pointer transition-all duration-200"
            >
              <Play className="w-4 h-4" />
              How It Works
            </motion.div>
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-14"
        >
          {heroStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              className="text-center group"
            >
              <div className="text-xl md:text-2xl font-bold font-mono text-primary group-hover:scale-105 transition-transform duration-200">
                {stat.value}
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated waveform */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-center gap-[2.5px] h-16"
        >
          {barHeights.map((bar, i) => (
            <motion.div
              key={i}
              className="rounded-full"
              style={{
                width: "3px",
                background: bar.isPink
                  ? "oklch(0.72 0.18 330 / 0.72)"
                  : "oklch(0.76 0.20 195 / 0.62)",
              }}
              animate={{
                height: [`${bar.min}px`, `${bar.max}px`, `${bar.min}px`],
              }}
              transition={{
                duration: bar.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: bar.delay,
              }}
            />
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-primary/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
