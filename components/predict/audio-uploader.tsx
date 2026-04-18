"use client"

import { useCallback, useState } from "react"
import { motion } from "framer-motion"
import { useDropzone } from "react-dropzone"
import { Upload, FileAudio, X, Loader2, Sparkles } from "lucide-react"
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
    accept: {
      "audio/*": [".wav", ".mp3", ".ogg", ".flac", ".m4a"],
    },
    multiple: false,
  })

  const handlePredict = async () => {
  if (!selectedFile) return

  setIsLoading(true)
  setError(null)

  try {
    const result = await predictEmotion(selectedFile)

    onPrediction(result)

    // 🔥 ADD THIS (LIVE DASHBOARD UPDATE)
    window.addPrediction?.({
      name: selectedFile.name,
      emotion: result.emotion,
    })

    window.updateEmotionChart?.(result.emotion)

  } catch (err) {
    setError("Failed to analyze audio. Please try again.")
    console.error(err)
  } finally {
    setIsLoading(false)
  }
}

  const removeFile = () => {
    setSelectedFile(null)
    setError(null)
  }

  return (
    <div className="space-y-6">
      <motion.div
        {...getRootProps()}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={`
          relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all
          ${isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}
          ${selectedFile ? "border-primary/50 bg-primary/5" : ""}
        `}
      >
        <input {...getInputProps()} />

        {isDragActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 rounded-xl bg-primary/10 flex items-center justify-center"
          >
            <div className="text-primary font-medium">Drop your audio file here</div>
          </motion.div>
        )}

        {selectedFile ? (
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4"
            >
              <FileAudio className="w-8 h-8 text-primary" />
            </motion.div>
            <p className="font-medium mb-1">{selectedFile.name}</p>
            <p className="text-sm text-muted-foreground">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                removeFile()
              }}
              className="mt-2 text-muted-foreground hover:text-destructive"
            >
              <X className="w-4 h-4 mr-1" /> Remove
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4"
            >
              <Upload className="w-8 h-8 text-muted-foreground" />
            </motion.div>
            <p className="font-medium mb-1">Drag and drop your audio file</p>
            <p className="text-sm text-muted-foreground">
              or click to browse (WAV, MP3, OGG, FLAC, M4A)
            </p>
          </div>
        )}
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm"
        >
          {error}
        </motion.div>
      )}

      <Button
        onClick={handlePredict}
        disabled={!selectedFile || isLoading}
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
    </div>
  )
}
