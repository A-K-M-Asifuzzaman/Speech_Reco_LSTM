"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, Brain, Github, Twitter, Linkedin } from "lucide-react"
import { HeroSection } from "@/components/home/hero-section"
import { PipelineStrip } from "@/components/home/pipeline-strip"
import { FeatureCards } from "@/components/home/feature-cards"
import { StatsSection } from "@/components/home/stats-section"

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Predict", href: "/predict" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "About", href: "/about" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen pt-16 overflow-hidden">
      {/* Global scan line */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="scan-line absolute w-full" />
      </div>

      <HeroSection />
      <StatsSection />
      <PipelineStrip />
      <FeatureCards />

      {/* CTA Section */}
      <section className="relative py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 aurora-bg opacity-40 pointer-events-none" />
        <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />

        {/* Orbs */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 orb orb-primary opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-56 h-56 orb orb-accent opacity-30 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card rounded-3xl p-10 md:p-14 border border-primary/18 neon-glow"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/12 border border-primary/25 text-xs text-primary font-medium mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary status-online" />
              Live Demo Available
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
              Ready to Understand{" "}
              <span className="neon-text">Emotions</span>?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-base md:text-lg">
              Start analyzing speech emotions with our cutting-edge AI technology.
              Upload audio or record directly — results in under 250ms.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/predict">
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0 0 32px oklch(0.76 0.20 195 / 0.5)" }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base cursor-pointer transition-all duration-200"
                  style={{ boxShadow: "0 0 18px oklch(0.76 0.20 195 / 0.25)" }}
                >
                  Try Prediction <ArrowRight className="w-4 h-4" />
                </motion.div>
              </Link>
              <Link href="/dashboard">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl glass-card border border-primary/30 hover:border-primary/55 hover:bg-primary/10 font-semibold text-base cursor-pointer transition-all duration-200"
                >
                  <BarChart3 className="w-4 h-4" />
                  View Dashboard
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border/40 py-12 px-4">
        <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Brand */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-primary/12 border border-primary/25">
                  <Brain className="w-4 h-4 text-primary" />
                </div>
                <span className="font-bold text-lg">
                  Emoti<span className="text-primary">Voice</span>
                  <span className="ml-1.5 text-[9px] uppercase tracking-widest text-muted-foreground border border-border/50 rounded px-1">AI</span>
                </span>
              </div>
              <p className="text-xs text-muted-foreground max-w-[220px] text-center md:text-left leading-relaxed">
                Speech emotion recognition powered by bidirectional LSTM neural networks.
              </p>
            </div>

            {/* Nav links */}
            <nav className="flex items-center gap-6">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {[
                { icon: Github, label: "GitHub" },
                { icon: Twitter, label: "Twitter" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  aria-label={label}
                  whileHover={{ scale: 1.15, color: "oklch(0.76 0.20 195)" }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-secondary/50 hover:bg-secondary text-muted-foreground transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <span>© 2025 EmotiVoice AI. All rights reserved.</span>
            <span className="font-mono">Powered by LSTM Neural Networks</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
