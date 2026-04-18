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

export function AudioRecorder({ onPrediction, isLoading, setIsLoading }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioLevels, setAudioLevels] = useState<number[]>(Array(20).fill(0.1))
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const updateAudioLevels = useCallback(() => {
    if (!analyserRef.current) return

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
    analyserRef.current.getByteFrequencyData(dataArray)

    const levels: number[] = []
    const step = Math.floor(dataArray.length / 20)
    for (let i = 0; i < 20; i++) {
      const value = dataArray[i * step] / 255
      levels.push(Math.max(0.1, value))
    }
    setAudioLevels(levels)

    animationFrameRef.current = requestAnimationFrame(updateAudioLevels)
  }, [])

  const startRecording = async () => {
    try {
      setError(null)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      audioContextRef.current = new AudioContext()
      analyserRef.current = audioContextRef.current.createAnalyser()
      analyserRef.current.fftSize = 256

      const source = audioContextRef.current.createMediaStreamSource(stream)
      source.connect(analyserRef.current)

      mediaRecorderRef.current = new MediaRecorder(stream)
      chunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data)
        }
      }

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/wav" })
        setRecordedBlob(blob)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorderRef.current.start(100)
      setIsRecording(true)
      setRecordingTime(0)
      setRecordedBlob(null)

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)

      updateAudioLevels()
    } catch (err) {
      console.error("Recording error:", err)
      setError("Microphone access denied. Please allow microphone access.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      if (timerRef.current) {
        clearInterval(timerRef.current)
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      if (audioContextRef.current) {
        audioContextRef.current.close()
      }

      setAudioLevels(Array(20).fill(0.1))
    }
  }

  const handlePredict = async () => {
    if (!recordedBlob) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await predictEmotion(recordedBlob)
      onPrediction(result)
    } catch (err) {
      setError("Failed to analyze audio. Please try again.")
      console.error(err)
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
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      if (audioContextRef.current) audioContextRef.current.close()
    }
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-6">
      {/* Waveform visualization */}
      <div className="h-32 flex items-center justify-center gap-1 bg-secondary/30 rounded-xl p-4">
        {audioLevels.map((level, i) => (
          <motion.div
            key={i}
            className="w-2 bg-primary rounded-full"
            animate={{
              height: isRecording ? `${level * 100}%` : "10%",
              opacity: isRecording ? 0.5 + level * 0.5 : 0.3,
            }}
            transition={{ duration: 0.1 }}
          />
        ))}
      </div>

      {/* Timer and controls */}
      <div className="text-center">
        <motion.div
          key={recordingTime}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className="text-4xl font-mono font-bold mb-6"
        >
          {formatTime(recordingTime)}
        </motion.div>

        <div className="flex items-center justify-center gap-4">
          {!recordedBlob ? (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                onClick={isRecording ? stopRecording : startRecording}
                className={`w-20 h-20 rounded-full ${
                  isRecording
                    ? "bg-destructive hover:bg-destructive/90"
                    : "bg-primary hover:bg-primary/90"
                }`}
              >
                {isRecording ? (
                  <Square className="w-8 h-8 text-white" fill="white" />
                ) : (
                  <Mic className="w-8 h-8 text-primary-foreground" />
                )}
              </Button>
            </motion.div>
          ) : (
            <>
              <Button
                variant="outline"
                size="lg"
                onClick={togglePlayback}
                className="w-14 h-14 rounded-full border-primary/50"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={resetRecording}
                className="w-14 h-14 rounded-full border-border"
              >
                <RotateCcw className="w-6 h-6" />
              </Button>
            </>
          )}
        </div>

        {/* Ripple effect when recording */}
        <AnimatePresence>
          {isRecording && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="w-20 h-20 rounded-full border-2 border-primary" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm text-center"
        >
          {error}
        </motion.div>
      )}

      <Button
        onClick={handlePredict}
        disabled={!recordedBlob || isLoading}
        className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Analyze Emotion
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Click the microphone to start recording. Recording is processed locally.
      </p>
    </div>
  )
}
