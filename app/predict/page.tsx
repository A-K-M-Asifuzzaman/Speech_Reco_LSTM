"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Mic } from "lucide-react"
import { AudioUploader } from "@/components/predict/audio-uploader"
import { AudioRecorder } from "@/components/predict/audio-recorder"
import { PredictionResult } from "@/components/predict/prediction-result"
import { PredictionResult as PredictionResultType } from "@/lib/api"

export default function PredictPage() {
  const [prediction, setPrediction] = useState<PredictionResultType | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handlePrediction = (result: PredictionResultType) => {
    setPrediction(result)
  }

  const handleReset = () => {
    setPrediction(null)
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      {/* Background */}
      <div className="fixed inset-0 grid-pattern opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Emotion <span className="text-primary neon-text">Prediction</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Upload an audio file or record your voice to analyze emotional content
            using our advanced LSTM neural network.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {prediction ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <PredictionResult result={prediction} onReset={handleReset} />
            </motion.div>
          ) : (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="glass-card rounded-2xl p-6 md:p-8">
                <Tabs defaultValue="upload" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8 bg-secondary/50">
                    <TabsTrigger
                      value="upload"
                      className="gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                    >
                      <Upload className="w-4 h-4" />
                      Upload Audio
                    </TabsTrigger>
                    <TabsTrigger
                      value="record"
                      className="gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                    >
                      <Mic className="w-4 h-4" />
                      Record Voice
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="upload">
                    <AudioUploader
                      onPrediction={handlePrediction}
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                    />
                  </TabsContent>

                  <TabsContent value="record">
                    <AudioRecorder
                      onPrediction={handlePrediction}
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
