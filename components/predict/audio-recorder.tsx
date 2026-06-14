"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, Square, Loader2, Sparkles, Play, Pause, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { predictEmotion, PredictionResult } from "@/lib/api"

interface AudioRecorderProps {
  onPrediction: (result: PredictionResult) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const BAR_COUNT = 32

export function AudioRecorder({ onPrediction, isLoading, setIsLoading }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioLevels, setAudioLevels] = useState<number[]>(Array(BAR_COUNT).fill(0.05))
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animFrameRef = useRef<number | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const updateLevels = useCallback(() => {
    if (!analyserRef.current) return
    const data = new Uint8Array(analyserRef.current.frequencyBinCount)
    analyserRef.current.getByteFrequencyData(data)
    const step = Math.floor(data.length / BAR_COUNT)
    setAudioLevels(
      Array.from({ length: BAR_COUNT }, (_, i) => Math.max(0.05, data[i * step] / 255))
    )
    animFrameRef.current = requestAnimationFrame(updateLevels)
  }, [])

  const startRecording = async () => {
    try {
      setError(null)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      audioContextRef.current = new AudioContext()
      analyserRef.current = audioContextRef.current.createAnalyser()
      analyserRef.current.fftSize = 256
      audioContextRef.current.createMediaStreamSource(stream).connect(analyserRef.current)

      mediaRecorderRef.current = new MediaRecorder(stream)
      chunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }
      mediaRecorderRef.current.onstop = () => {
        setRecordedBlob(new Blob(chunksRef.current, { type: "audio/wav" }))
        stream.getTracks().forEach((t) => t.stop())
      }

      mediaRecorderRef.current.start(100)
      setIsRecording(true)
      setRecordingTime(0)
      setRecordedBlob(null)

      timerRef.current = setInterval(() => setRecordingTime((p) => p + 1), 1000)
      updateLevels()
    } catch {
      setError("Microphone access denied. Please allow microphone permissions.")
    }
  }

  const stopRecording = () => {
    if (!mediaRecorderRef.current || !isRecording) return
    mediaRecorderRef.current.stop()
    setIsRecording(false)
    if (timerRef.current) clearInterval(timerRef.current)
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    if (audioContextRef.current) audioContextRef.current.close()
    setAudioLevels(Array(BAR_COUNT).fill(0.05))
  }

  const handlePredict = async () => {
    if (!recordedBlob) return
    setIsLoading(true)
    setError(null)
    try {
      const result = await predictEmotion(recordedBlob)
      onPrediction(result)
    } catch {
      setError("Failed to analyze audio. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const resetRecording = () => {
    setRecordedBlob(null)
    setRecordingTime(0)
    setIsPlaying(false)
    setError(null)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  const togglePlayback = () => {
    if (!recordedBlob || !audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    if (recordedBlob) {
      const url = URL.createObjectURL(recordedBlob)
      audioRef.current = new Audio(url)
      audioRef.current.onended = () => setIsPlaying(false)
      return () => URL.revokeObjectURL(url)
    }
  }, [recordedBlob])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      if (audioContextRef.current) audioContextRef.current.close()
    }
  }, [])

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`

  return (
    <div className="space-y-6">
      {/* Waveform display */}
      <div className="relative h-28 flex items-center justify-center gap-[3px] bg-secondary/25 rounded-2xl px-4 overflow-hidden border border-border/35">
        {/* Background glow when recording */}
        <AnimatePresence>
          {isRecording && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{ background: "radial-gradient(ellipse at center, oklch(0.76 0.20 195 / 0.06) 0%, transparent 70%)" }}
            />
          )}
        </AnimatePresence>

        {audioLevels.map((level, i) => (
          <motion.div
            key={i}
            className="rounded-full"
            style={{
              width: "3px",
              background: isRecording
                ? i % 5 === 0
                  ? "oklch(0.72 0.18 330 / 0.8)"
                  : "oklch(0.76 0.20 195 / 0.75)"
                : "oklch(0.22 0.025 260)",
            }}
            animate={{
              height: isRecording ? `${Math.max(6, level * 96)}px` : "6px",
              opacity: isRecording ? 0.5 + level * 0.5 : 0.3,
            }}
            transition={{ duration: 0.08 }}
          />
        ))}
      </div>

      {/* Timer */}
      <div className="text-center">
        <motion.div
          key={recordingTime}
          initial={{ scale: 1.08, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-5xl font-mono font-bold tabular-nums mb-6"
          style={{ color: isRecording ? "oklch(0.76 0.20 195)" : "inherit" }}
        >
          {fmt(recordingTime)}
        </motion.div>

        {/* Controls */}
        <div className="relative flex items-center justify-center gap-5">
          {/* Ripple behind button when recording */}
          <AnimatePresence>
            {isRecording && (
              <>
                {[0, 1].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 1.8, delay: i * 0.9, repeat: Infinity, ease: "easeOut" }}
                  >
                    <div className="w-20 h-20 rounded-full border-2 border-primary" />
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>

          {!recordedBlob ? (
            <motion.button
              onClick={isRecording ? stopRecording : startRecording}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              className="relative w-20 h-20 rounded-full flex items-center justify-center font-semibold transition-all duration-200 z-10"
              style={{
                background: isRecording
                  ? "oklch(0.55 0.22 25)"
                  : "oklch(0.76 0.20 195)",
                boxShadow: isRecording
                  ? "0 0 24px oklch(0.55 0.22 25 / 0.5)"
                  : "0 0 24px oklch(0.76 0.20 195 / 0.4)",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isRecording ? (
                  <motion.div
                    key="stop"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Square className="w-7 h-7 text-white" fill="white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="mic"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Mic className="w-7 h-7 text-primary-foreground" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ) : (
            <>
              <motion.button
                onClick={togglePlayback}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                className="w-14 h-14 rounded-full flex items-center justify-center glass-card border border-primary/35 hover:border-primary/60 transition-all duration-200"
              >
                {isPlaying ? <Pause className="w-5 h-5 text-primary" /> : <Play className="w-5 h-5 text-primary" />}
              </motion.button>
              <motion.button
                onClick={resetRecording}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                className="w-14 h-14 rounded-full flex items-center justify-center glass-card border border-border/50 hover:border-border transition-all duration-200"
              >
                <RotateCcw className="w-5 h-5 text-muted-foreground" />
              </motion.button>
            </>
          )}
        </div>

        {/* Status label */}
        <motion.p
          key={isRecording ? "rec" : recordedBlob ? "done" : "idle"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-xs text-muted-foreground"
        >
          {isRecording
            ? "Recording… click square to stop"
            : recordedBlob
              ? "Recording ready — play to preview or analyze"
              : "Click the microphone to start recording"}
        </motion.p>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm text-center"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analyze button */}
      <Button
        onClick={handlePredict}
        disabled={!recordedBlob || isLoading}
        className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground gap-2 text-base font-semibold disabled:opacity-40"
        style={{ boxShadow: recordedBlob && !isLoading ? "0 0 20px oklch(0.76 0.20 195 / 0.28)" : "none" }}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Analyzing emotion…
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Analyze Emotion
          </>
        )}
      </Button>
    </div>
  )
}
