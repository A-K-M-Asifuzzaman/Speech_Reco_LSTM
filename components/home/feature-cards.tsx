"use client"

import { motion } from "framer-motion"
import { Zap, Shield, Waves, Activity, Brain, Clock } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Real-time Analysis",
    description: "Process audio in milliseconds with our optimized LSTM architecture for instant emotion detection.",
    color: "text-chart-1",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your audio data is processed securely and never stored. Complete privacy guaranteed.",
    color: "text-chart-3",
  },
  {
    icon: Waves,
    title: "7 Emotions Detected",
    description: "Identify Happy, Sad, Angry, Neutral, Fear, Surprise, and Disgust with high accuracy.",
    color: "text-chart-2",
  },
  {
    icon: Activity,
    title: "MFCC Features",
    description: "Advanced Mel-frequency cepstral coefficients extraction for superior audio analysis.",
    color: "text-chart-4",
  },
  {
    icon: Brain,
    title: "Deep Learning",
    description: "Powered by state-of-the-art LSTM neural networks trained on extensive emotion datasets.",
    color: "text-chart-5",
  },
  {
    icon: Clock,
    title: "Batch Processing",
    description: "Analyze multiple audio files simultaneously with our efficient batch processing system.",
    color: "text-chart-1",
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
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built with cutting-edge technology for accurate and reliable emotion recognition.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group"
              >
                <div className="h-full glass-card rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.15)]">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4 ${feature.color}`}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
