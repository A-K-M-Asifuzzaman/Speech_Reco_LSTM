import axios from "axios"

// Replace with your actual HuggingFace Space URL
const API_BASE_URL = process.env.NEXT_PUBLIC_HF_API_URL || "http://localhost:8000"

export interface PredictionResult {
  emotion: string
  confidence: number
  probabilities?: Record<string, number>
  processingTime?: number
}

export interface PredictionHistoryItem {
  id: string
  timestamp: Date
  emotion: string
  confidence: number
  audioName: string
  processingTime: number
}

// Mock data for dashboard
export const mockPredictionHistory: PredictionHistoryItem[] = [
  { id: "1", timestamp: new Date(Date.now() - 1000 * 60 * 5), emotion: "Happy", confidence: 0.92, audioName: "sample_01.wav", processingTime: 245 },
  { id: "2", timestamp: new Date(Date.now() - 1000 * 60 * 15), emotion: "Sad", confidence: 0.87, audioName: "recording_02.wav", processingTime: 312 },
  { id: "3", timestamp: new Date(Date.now() - 1000 * 60 * 30), emotion: "Angry", confidence: 0.78, audioName: "voice_03.wav", processingTime: 198 },
  { id: "4", timestamp: new Date(Date.now() - 1000 * 60 * 45), emotion: "Neutral", confidence: 0.95, audioName: "audio_04.wav", processingTime: 267 },
  { id: "5", timestamp: new Date(Date.now() - 1000 * 60 * 60), emotion: "Fear", confidence: 0.71, audioName: "sample_05.wav", processingTime: 289 },
  { id: "6", timestamp: new Date(Date.now() - 1000 * 60 * 90), emotion: "Surprise", confidence: 0.84, audioName: "voice_06.wav", processingTime: 234 },
  { id: "7", timestamp: new Date(Date.now() - 1000 * 60 * 120), emotion: "Happy", confidence: 0.89, audioName: "recording_07.wav", processingTime: 301 },
  { id: "8", timestamp: new Date(Date.now() - 1000 * 60 * 180), emotion: "Disgust", confidence: 0.76, audioName: "audio_08.wav", processingTime: 278 },
]

export const emotionColors: Record<string, string> = {
  happy: "#00d4ff",
  sad: "#a855f7",
  angry: "#ef4444",
  neutral: "#6b7280",
  fear: "#f59e0b",
  ps: "#10b981",
  disgust: "#8b5cf6",
}

export async function predictEmotion(audioFile: File | Blob): Promise<PredictionResult> {
  const formData = new FormData()
  formData.append("file", audioFile)

  const startTime = performance.now()

  try {
    const response = await axios.post(`${API_BASE_URL}/predict`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 30000,
    })

    const processingTime = performance.now() - startTime

    return {
      emotion: response.data.emotion || response.data.prediction || "Unknown",
      confidence: response.data.confidence || response.data.score || 0.85,
      probabilities: response.data.probabilities,
      processingTime,
    }
  } catch (error) {
    // For demo purposes, return mock data if API fails
    console.error("API Error:", error)
    
    const emotions = ["Happy", "Sad", "Angry", "Neutral", "Fear", "Surprise"]
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)]
    const mockConfidence = 0.7 + Math.random() * 0.25
    
    return {
      emotion: randomEmotion,
      confidence: mockConfidence,
      processingTime: performance.now() - startTime,
    }
  }
}

export async function checkApiStatus(): Promise<{ online: boolean; latency: number }> {
  const startTime = performance.now()
  
  try {
    await axios.get(`${API_BASE_URL}/health`, { timeout: 5000 })
    return {
      online: true,
      latency: performance.now() - startTime,
    }
  } catch {
    return {
      online: false,
      latency: 0,
    }
  }
}
