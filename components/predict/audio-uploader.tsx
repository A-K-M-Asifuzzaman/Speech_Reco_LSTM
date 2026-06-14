"use client"

import { useCallback, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useDropzone } from "react-dropzone"
import { Upload, FileAudio, X, Loader2, Sparkles, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { predictEmotion, PredictionResult } from "@/lib/api"

interface AudioUploaderProps {
  onPrediction: (result: PredictionResult) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export function AudioUploader({ onPrediction, isLoading, setIsLoading }: AudioUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null)
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB")
        return
      }
      setSelectedFile(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "audio/*": [".wav", ".mp3", ".ogg", ".flac", ".m4a"] },
    multiple: false,
  })

  const handlePredict = async () => {
    if (!selectedFile) return
    setIsLoading(true)
    setError(null)
    try {
      const result = await predictEmotion(selectedFile)
      onPrediction(result)
      if (typeof window !== "undefined") {
        ;(window as any).addPrediction?.({ name: selectedFile.name, emotion: result.emotion })
        ;(window as any).updateEmotionChart?.(result.emotion)
      }
    } catch {
      setError("Failed to analyze audio. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
    setError(null)
  }

  const sizeKB = selectedFile ? (selectedFile.size / 1024).toFixed(0) : 0

  return (
    <div className="space-y-5">
      {/* Drop zone */}
      <motion.div
        {...getRootProps()}
        whileHover={!selectedFile ? { scale: 1.005 } : {}}
        whileTap={!selectedFile ? { scale: 0.998 } : {}}
        className={[
          "relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 overflow-hidden",
          isDragActive
            ? "border-primary bg-primary/8 shadow-[0_0_30px_oklch(0.76_0.20_195/0.2)]"
            : selectedFile
              ? "border-primary/55 bg-primary/6 cursor-default"
              : "border-border/60 hover:border-primary/45 hover:bg-primary/4",
        ].join(" ")}
      >
        {/* Animated gradient border on drag */}
        {isDragActive && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: "radial-gradient(ellipse at center, oklch(0.76 0.20 195 / 0.08) 0%, transparent 70%)",
            }}
          />
        )}

        <input {...getInputProps()} />

        <AnimatePresence mode="wait">
          {selectedFile ? (
            <motion.div
              key="file"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="flex flex-col items-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
                className="w-16 h-16 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-4"
                style={{ boxShadow: "0 0 20px oklch(0.76 0.20 195 / 0.2)" }}
              >
                <FileAudio className="w-8 h-8 text-primary" />
              </motion.div>

              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-4 h-4 text-chart-3 shrink-0" />
                <p className="font-semibold truncate max-w-60">{selectedFile.name}</p>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{sizeKB} KB · Ready to analyze</p>

              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => { e.stopPropagation(); removeFile() }}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-1.5"
              >
                <X className="w-3.5 h-3.5" />
                Remove file
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={isDragActive ? { scale: 1.15, y: -4 } : { y: [0, -6, 0] }}
                transition={isDragActive ? { duration: 0.2 } : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 rounded-2xl bg-secondary/70 flex items-center justify-center mb-4"
              >
                <Upload className="w-8 h-8 text-muted-foreground" />
              </motion.div>

              {isDragActive ? (
                <p className="font-semibold text-primary">Drop it here!</p>
              ) : (
                <>
                  <p className="font-semibold mb-1.5">Drag & drop your audio file</p>
                  <p className="text-sm text-muted-foreground">
                    or <span className="text-primary underline underline-offset-2">click to browse</span>
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-2">WAV · MP3 · OGG · FLAC · M4A · Max 10MB</p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm flex items-center gap-2"
          >
            <X className="w-4 h-4 shrink-0" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <motion.div whileHover={selectedFile && !isLoading ? { scale: 1.01 } : {}} whileTap={selectedFile && !isLoading ? { scale: 0.98 } : {}}>
        <Button
          onClick={handlePredict}
          disabled={!selectedFile || isLoading}
          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground gap-2 text-base font-semibold transition-all duration-200 disabled:opacity-40"
          style={{ boxShadow: selectedFile && !isLoading ? "0 0 20px oklch(0.76 0.20 195 / 0.3)" : "none" }}
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
      </motion.div>
    </div>
  )
}
