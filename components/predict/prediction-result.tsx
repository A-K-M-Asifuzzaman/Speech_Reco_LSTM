"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Heart, Frown, Angry, Meh, AlertTriangle, Zap, ThumbsDown, Clock, TrendingUp } from "lucide-react"
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

const emotionDescriptions: Record<string, string> = {
  Happy: "Positive and uplifting tone detected in the speech.",
  Sad: "Signs of sadness or low energy found in the vocal patterns.",
  Angry: "Elevated intensity and tension detected in the voice.",
  Neutral: "Calm, balanced, and emotionally neutral speech.",
  Fear: "Anxiety and heightened stress patterns detected.",
  Surprise: "Unexpected exclamation or astonishment in the voice.",
  Disgust: "Displeasure or aversion conveyed through vocal cues.",
}

function ConfidenceBar({ label, value, color, isMain }: { label: string; value: number; color: string; isMain: boolean }) {
  const pct = Math.round(value * 100)
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className={isMain ? "font-semibold" : "text-muted-foreground"}>{label}</span>
        <span className="font-mono font-semibold" style={{ color: isMain ? color : "inherit" }}>{pct}%</span>
      </div>
      <div className="h-2 bg-secondary/60 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          className="h-full rounded-full"
          style={{
            background: isMain
              ? `linear-gradient(90deg, ${color}cc, ${color})`
              : `${color}55`,
          }}
        />
      </div>
    </div>
  )
}

export function PredictionResult({ result, onReset }: PredictionResultProps) {
  const Icon = emotionIcons[result.emotion] || Meh
  const color = emotionColors[result.emotion.toLowerCase()] || "#6b7280"
  const confidencePct = Math.round(result.confidence * 100)
  const description = emotionDescriptions[result.emotion] || ""

  return (
    <div className="glass-card rounded-2xl p-6 md:p-10 border border-border/40 overflow-hidden relative">
      {/* Background ambient */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-40"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${color}12 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10">
        {/* Icon + emotion name */}
        <div className="flex flex-col items-center text-center mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", bounce: 0.55, duration: 0.7 }}
            className="relative mb-6"
          >
            {/* Outer ring glow */}
            <motion.div
              animate={{
                boxShadow: [
                  `0 0 30px ${color}35`,
                  `0 0 60px ${color}55`,
                  `0 0 30px ${color}35`,
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="w-28 h-28 rounded-full flex items-center justify-center"
              style={{
                background: `radial-gradient(circle, ${color}22 0%, ${color}08 100%)`,
                border: `2px solid ${color}55`,
              }}
            >
              <Icon className="w-14 h-14" style={{ color }} />
            </motion.div>

            {/* Confidence ring */}
            <svg className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)] -rotate-90" viewBox="0 0 116 116">
              <circle cx="58" cy="58" r="52" fill="none" stroke={`${color}18`} strokeWidth="3" />
              <motion.circle
                cx="58" cy="58" r="52"
                fill="none"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 52}`}
                initial={{ strokeDashoffset: `${2 * Math.PI * 52}` }}
                animate={{ strokeDashoffset: `${2 * Math.PI * 52 * (1 - result.confidence)}` }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
              />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <div className="text-sm text-muted-foreground uppercase tracking-widest mb-1 font-medium">
              Detected Emotion
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-3" style={{ color }}>
              {result.emotion}
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs">{description}</p>
          </motion.div>
        </div>

        {/* Main confidence bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass-card rounded-xl p-5 border border-border/35 mb-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Confidence Score</span>
            </div>
            <span className="text-2xl font-bold font-mono" style={{ color }}>
              {confidencePct}%
            </span>
          </div>
          <div className="h-3 bg-secondary/60 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${confidencePct}%` }}
              transition={{ duration: 1.1, ease: "easeOut", delay: 0.5 }}
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${color}88, ${color})`,
                boxShadow: `0 0 12px ${color}50`,
              }}
            />
          </div>
        </motion.div>

        {/* Processing time */}
        {result.processingTime !== undefined && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-6"
          >
            <Clock className="w-3.5 h-3.5" />
            Processed in{" "}
            <span className="font-mono font-semibold text-foreground">
              {Math.round(result.processingTime)}ms
            </span>
          </motion.div>
        )}

        {/* All probabilities */}
        {result.probabilities && Object.keys(result.probabilities).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="glass-card rounded-xl p-5 border border-border/35 mb-6"
          >
            <h3 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">
              All Probabilities
            </h3>
            <div className="space-y-3">
              {Object.entries(result.probabilities)
                .sort(([, a], [, b]) => b - a)
                .map(([emotion, prob]) => (
                  <ConfidenceBar
                    key={emotion}
                    label={emotion}
                    value={prob}
                    color={emotionColors[emotion.toLowerCase()] || "#6b7280"}
                    isMain={emotion === result.emotion}
                  />
                ))}
            </div>
          </motion.div>
        )}

        {/* Reset */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="flex justify-center"
        >
          <Button
            onClick={onReset}
            variant="outline"
            className="gap-2 border-primary/35 hover:bg-primary/10 hover:border-primary/55 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Analyze Another
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
