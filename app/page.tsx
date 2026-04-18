"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, Brain } from "lucide-react"
import { HeroSection } from "@/components/home/hero-section"
import { PipelineStrip } from "@/components/home/pipeline-strip"
import { FeatureCards } from "@/components/home/feature-cards"

export default function HomePage() {
  return (
    <div className="min-h-screen pt-16 overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 grid-pattern opacity-50 pointer-events-none" />
      
      {/* Scan line effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="scan-line absolute w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>

      <HeroSection />
      <PipelineStrip />
      <FeatureCards />

      {/* CTA Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-12 neon-glow"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              Ready to Understand <span className="text-primary neon-text">Emotions</span>?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Start analyzing speech emotions with our cutting-edge AI technology.
              No setup required.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/predict">
                <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                  Try Prediction <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="gap-2 border-primary/50 hover:bg-primary/10">
                  <BarChart3 className="w-4 h-4" />
                  View Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            <span className="font-semibold">EmotiVoice AI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Powered by LSTM Neural Networks
          </p>
        </div>
      </footer>
    </div>
  )
}
