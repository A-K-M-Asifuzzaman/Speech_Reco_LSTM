# EmotiVoice AI - Speech Emotion Recognition

A futuristic AI-powered speech emotion recognition system built with Next.js, featuring real-time audio recording, LSTM-based emotion classification, and a Grafana-style analytics dashboard.

## Features

### Home Page (`/`)
- Animated hero section with scan line effect and live audio waveform visualization
- Interactive pipeline strip showing the ML workflow: Audio → MFCC → Spectrogram → LSTM → Emotion
- Feature cards with neon glow accents explaining the technology

### Predict Page (`/predict`)
- **Upload Mode**: Drag-and-drop audio file upload with support for WAV, MP3, OGG, FLAC, M4A formats
- **Record Mode**: Full Web Audio API implementation with:
  - Live animated waveform bars
  - Ripple animation while recording
  - Real-time timer
  - MediaRecorder integration
- Emotion prediction results with confidence scores and processing time

### Dashboard (`/dashboard`)
- Grafana-style dark grid layout
- 4 metric cards: Total Predictions, Avg Response Time, Model Accuracy, API Uptime
- AreaChart for confidence scores over time
- PieChart for emotion distribution across 7 emotions
- BarChart for API response times
- Scrollable prediction history table
- Real-time system status panel

### About Page (`/about`)
- Animated 6-step pipeline visualization
- 4 tech explainer cards (MFCC, Mel Spectrogram, LSTM, Prediction)
- Full LSTM layer-by-layer architecture breakdown (~2.4M parameters)
- Performance benchmarks and training configuration

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 with custom design tokens
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Audio**: Web Audio API, MediaRecorder API
- **ML Backend**: HuggingFace Spaces (LSTM model)

## Supported Emotions

| Emotion | Description |
|---------|-------------|
| Happy | Joy, excitement, positive affect |
| Sad | Sorrow, melancholy, grief |
| Angry | Frustration, rage, irritation |
| Fear | Anxiety, worry, apprehension |
| Disgust | Revulsion, distaste |
| Surprise | Astonishment, shock |
| Neutral | Calm, balanced, no strong emotion |
| Pleasant Surprise (PS) | Positive unexpected reaction |

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd emotivoice-ai

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# HuggingFace Space API URL (optional - defaults to the included endpoint)
NEXT_PUBLIC_HF_API_URL=http://asifzaman1912-speech-recog-lstm.hf.space
```

## API Reference

### POST `/api/predict`

Proxies audio files to the HuggingFace LSTM model for emotion prediction.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `file` - Audio file (WAV, MP3, OGG, etc.)

**Response:**
```json
{
  "emotion": "happy",
  "confidence": 0.92,
  "processingTime": 245
}
```

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Audio     │────▶│    MFCC     │────▶│    Mel      │
│   Input     │     │  Extraction │     │ Spectrogram │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Emotion    │◀────│   Dense     │◀────│    LSTM     │
│  Output     │     │   Layers    │     │   Layers    │
└─────────────┘     └─────────────┘     └─────────────┘
```

### LSTM Model Architecture

| Layer | Type | Output Shape | Parameters |
|-------|------|--------------|------------|
| 1 | Input | (None, 128, 40) | 0 |
| 2 | LSTM | (None, 128, 256) | 304,128 |
| 3 | Dropout | (None, 128, 256) | 0 |
| 4 | LSTM | (None, 128) | 197,120 |
| 5 | Dense | (None, 64) | 8,256 |
| 6 | Dropout | (None, 64) | 0 |
| 7 | Dense (Output) | (None, 8) | 520 |

**Total Parameters**: ~2.4M

## Project Structure

```
├── app/
│   ├── api/predict/route.ts    # API proxy for HuggingFace
│   ├── dashboard/page.tsx      # Analytics dashboard
│   ├── predict/page.tsx        # Upload/Record interface
│   ├── about/page.tsx          # Technical documentation
│   ├── layout.tsx              # Root layout with providers
│   └── page.tsx                # Home page
├── components/
│   ├── home/                   # Hero, pipeline, features
│   ├── predict/                # Uploader, recorder, results
│   ├── dashboard/              # Charts, metrics, history
│   ├── about/                  # Pipeline, LSTM, benchmarks
│   └── ui/                     # shadcn/ui components
├── lib/
│   ├── api.ts                  # API client functions
│   └── prediction-store.tsx    # Global state management
└── public/                     # Static assets
```

## Performance

- **Model Accuracy**: 85-92% depending on emotion class
- **Average Inference Time**: 200-400ms
- **Supported Sample Rate**: 16kHz (recommended)
- **Max Audio Duration**: 10 seconds per prediction

## License

MIT License - feel free to use this project for learning and development.

## Acknowledgments

- LSTM model trained on the RAVDESS and TESS emotion datasets
- Built with [Next.js](https://nextjs.org), [shadcn/ui](https://ui.shadcn.com), and [Framer Motion](https://www.framer.com/motion/)
- Deployed on [Vercel](https://vercel.com)
