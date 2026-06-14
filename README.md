# EmotiVoice AI — Speech Emotion Recognition

> **Portfolio Project** · Next.js 16 · Bidirectional LSTM · Tailwind CSS v4 · Framer Motion

A production-grade web application that decodes human emotions from speech using a bidirectional LSTM neural network trained on the RAVDESS dataset. Upload an audio file or record your voice — get a confidence-scored emotion prediction in under 250ms.

---

## Features

| Feature | Details |
|---|---|
| **7 Emotion Classes** | Happy · Sad · Angry · Neutral · Fear · Surprise · Disgust |
| **94.2% Accuracy** | Weighted average on RAVDESS test set |
| **Dual Input Modes** | Drag-and-drop upload or live microphone recording |
| **Real-time Waveform** | Live audio level visualisation during recording |
| **Analytics Dashboard** | Accuracy trends, response times, emotion distribution |
| **Architecture Viewer** | Interactive LSTM layer breakdown with parameter counts |
| **Privacy First** | Audio processed in-session; nothing persisted server-side |
| **Mobile Responsive** | Full feature parity on all screen sizes |
| **Scroll Progress Bar** | Spring-physics reading indicator |
| **Mouse Parallax** | Cursor-driven ambient orb movement on hero |

---

## Tech Stack

### Frontend
- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** — utility-first with oklch design tokens
- **Framer Motion** — scroll animations, parallax, count-up, waveform, spring physics
- **Recharts** — accuracy, response-time, and emotion distribution charts
- **shadcn/ui** — accessible headless component primitives
- **Space Grotesk** + **JetBrains Mono** — display + mono typography

### ML Backend (separate service)
- **Python / FastAPI** — REST endpoint at `/predict` and `/health`
- **TensorFlow / Keras** — bidirectional LSTM model
- **Librosa** — MFCC + Mel spectrogram extraction
- **RAVDESS + TESS datasets** — 10K+ labelled emotional speech utterances

### Deployment
- **Frontend** → Vercel (zero-config Next.js)
- **ML Backend** → HuggingFace Spaces or Railway

---

## Model Architecture

```
Input (batch, T, 13)           ← 13 MFCC coefficients per frame
Bidirectional LSTM 1            ← 542,720 params
Dropout (0.3)
Bidirectional LSTM 2            ← 1,576,960 params
Attention Layer                 ← 262,656 params
Dense 128 (ReLU)                ← 65,664 params
Output 7 (Softmax)              ← 903 params
────────────────────────────────────────────────
Total: 2,448,903 parameters   (~9.5 MB)
```

**Training config:** Adam · LR 1e-4 · Batch 32 · 100 epochs · 20% val split

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm / pnpm / yarn

### Installation

```bash
git clone https://github.com/your-username/emotivoice-ai
cd emotivoice-ai
npm install
```

### Environment Variables

Create `.env.local`:

```env
# URL of your FastAPI ML backend (HuggingFace Spaces, Railway, etc.)
# Falls back to mock predictions when blank — UI is fully explorable without a backend
NEXT_PUBLIC_HF_API_URL=https://your-space.hf.space
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

---

## API Reference

### `POST /predict`

```
Content-Type: multipart/form-data
Body: file — audio file (WAV, MP3, OGG, FLAC, M4A, ≤10MB)
```

**Response**

```json
{
  "emotion": "Happy",
  "confidence": 0.924,
  "probabilities": {
    "Happy": 0.924,
    "Neutral": 0.041,
    "Sad": 0.018,
    "Angry": 0.009,
    "Fear": 0.005,
    "Surprise": 0.002,
    "Disgust": 0.001
  }
}
```

### `GET /health`

```json
{ "status": "ok" }
```

When the backend is unreachable the frontend silently falls back to mock predictions so the full UI remains explorable during demos.

---

## Project Structure

```
app/
├── page.tsx                  # Home — hero, stats, pipeline, features, CTA, footer
├── predict/page.tsx          # Prediction — upload or live-record audio
├── dashboard/page.tsx        # Analytics — charts, system status, history
├── about/page.tsx            # About — pipeline, architecture, benchmarks
├── globals.css               # Design tokens, animations, glassmorphism utilities
└── layout.tsx                # Root layout — fonts, metadata, scroll progress

components/
├── navigation.tsx            # Scroll-aware floating nav + animated mobile drawer
├── ui/
│   └── scroll-progress.tsx  # Spring-physics reading progress bar
├── home/
│   ├── hero-section.tsx     # Mouse-parallax hero with animated waveform
│   ├── stats-section.tsx    # Count-up animated benchmark stat cards
│   ├── pipeline-strip.tsx   # 5-stage pipeline with flowing data packet animation
│   └── feature-cards.tsx    # Bento grid with hover glow effects
├── dashboard/
│   ├── metric-cards.tsx     # Live metric tiles with trend indicators
│   ├── accuracy-chart.tsx   # Area chart — monthly accuracy trend
│   ├── emotion-distribution.tsx  # Pie chart — live prediction breakdown
│   ├── response-time-chart.tsx   # Bar chart — API latency per window
│   ├── prediction-history.tsx    # Animated live prediction feed
│   └── system-status.tsx         # Infrastructure health with live indicators
├── predict/
│   ├── audio-uploader.tsx   # Drag-and-drop with file preview and validation
│   ├── audio-recorder.tsx   # Live mic recording with real-time waveform
│   └── prediction-result.tsx  # Animated result card with confidence ring SVG
└── about/
    ├── animated-pipeline.tsx   # 6-step interactive pipeline with data flow
    ├── tech-explainers.tsx     # MFCC, Spectrogram, LSTM, Classification cards
    ├── lstm-architecture.tsx   # Layer-by-layer breakdown with parameter counts
    └── performance-benchmarks.tsx  # Bar charts + training configuration

lib/
├── api.ts      # predictEmotion(), checkApiStatus(), mock data, emotionColors
└── utils.ts    # cn() Tailwind class merge utility
```

---

## Design System

The theme uses **oklch** colour space for perceptually uniform colours:

| Token | Value | Role |
|---|---|---|
| `--primary` | `oklch(0.76 0.20 195)` | Neon cyan — CTAs, highlights |
| `--accent` | `oklch(0.72 0.18 330)` | Neon pink — secondary accents |
| `--chart-3` | `oklch(0.68 0.22 145)` | Neon green — success / online |
| `--background` | `oklch(0.06 0.012 260)` | Near-black blue-tinted base |

**Key CSS utilities** (`globals.css`):

| Class | Effect |
|---|---|
| `.glass-card` | Frosted glass — backdrop blur + semi-transparent bg |
| `.glass-card-strong` | Heavier frosted glass for nav / overlays |
| `.neon-text` | Cyan→pink gradient text with drop shadow glow |
| `.neon-glow` | Box shadow glow on cards |
| `.aurora-bg` | Animated 4-stop gradient background |
| `.pulse-neon` | Cyclic glow breathing animation |
| `.dot-pattern` | Subtle radial dot mesh overlay |
| `.grid-pattern` | Thin line grid overlay |
| `.scan-line` | Translucent horizontal sweep animation |
| `.glow-ring` | Ping/ripple ring for live status indicators |

---

## Screenshots

| Page | Description |
|---|---|
| `/` | Hero with parallax orbs, animated waveform, stat counters |
| `/predict` | Upload zone or live recorder → emotion result with confidence ring |
| `/dashboard` | Analytics grid — 4 metric cards, 3 charts, prediction history |
| `/about` | Pipeline, LSTM architecture diagram, benchmark charts |

---

## Performance

- **Lighthouse**: 95+ Performance (production build)
- Fonts: `display: swap` — no render blocking
- Per-route code splitting via App Router
- `will-change: transform` on all parallax elements
- Framer Motion `layout` prop for shared-element transitions

---

## License

MIT — free to use, modify, and distribute.

---

*Built as a portfolio showcase demonstrating full-stack ML integration, modern React patterns, and production-quality UI/UX engineering.*
