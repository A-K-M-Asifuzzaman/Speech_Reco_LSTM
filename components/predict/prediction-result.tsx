"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Heart, Frown, Angry, Meh, AlertTriangle, Zap, ThumbsDown, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PredictionResult as PredictionResultType, emotionColors } from "@/lib/api"

interface PredictionResultProps {
  result: PredictionResultType
  onReset: () => void
}

const emotionIcons: Record<string, React.ElementType> = {
  Happy: Heart,
  Sad: Frown,
  Angry: Angry,
  Neutral: Meh,
  Fear: AlertTriangle,
  Surprise: Zap,
  Disgust: ThumbsDown,
}

export function PredictionResult({ result, onReset }: PredictionResultProps) {
  const Icon = emotionIcons[result.emotion] || Meh
  const color = emotionColors[result.emotion] || "#6b7280"
  const confidencePercent = Math.round(result.confidence * 100)

  return (
    <div className="glass-card rounded-2xl p-8 md:p-12">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="flex flex-col items-center text-center"
      >
        {/* Emotion Icon */}
        <motion.div
          animate={{
            boxShadow: [
              `0 0 30px ${color}40`,
              `0 0 60px ${color}60`,
              `0 0 30px ${color}40`,
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-32 h-32 rounded-full flex items-center justify-center mb-8"
          style={{ backgroundColor: `${color}20`, border: `2px solid ${color}` }}
        >
          <Icon className="w-16 h-16" style={{ color }} />
        </motion.div>

        {/* Emotion Badge */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span
            className="text-4xl md:text-5xl font-bold mb-2 block"
            style={{ color }}
          >
            {result.emotion}
          </span>
        </motion.div>

        {/* Confidence Score */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 w-full max-w-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Confidence</span>
            <span className="text-sm font-mono font-bold" style={{ color }}>
              {confidencePercent}%
            </span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${confidencePercent}%` }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ backgroundColor: color }}
            />
          </div>
        </motion.div>

        {/* Processing Time */}
        {result.processingTime && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2 mt-6 text-sm text-muted-foreground"
          >
            <Clock className="w-4 h-4" />
            Processed in {Math.round(result.processingTime)}ms
          </motion.div>
        )}

        {/* Probabilities */}
        {result.probabilities && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 w-full max-w-md"
          >
            <h3 className="text-sm font-medium mb-4 text-muted-foreground">
              All Probabilities
            </h3>
            <div className="space-y-2">
              {Object.entries(result.probabilities)
                .sort((a, b) => b[1] - a[1])
                .map(([emotion, prob]) => (
                  <div key={emotion} className="flex items-center gap-3">
                    <span className="text-xs w-16 text-right">{emotion}</span>
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${prob * 100}%`,
                          backgroundColor: emotionColors[emotion] || "#6b7280",
                        }}
                      />
                    </div>
                    <span className="text-xs font-mono w-10">
                      {Math.round(prob * 100)}%
                    </span>
                  </div>
                ))}
            </div>
          </motion.div>
        )}

        {/* Reset Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10"
        >
          <Button
            onClick={onReset}
            variant="outline"
            className="gap-2 border-primary/50 hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4" />
            Analyze Another
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
