import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Navigation } from '@/components/navigation'
import { ScrollProgress } from '@/components/ui/scroll-progress'

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'EmotiVoice AI | Speech Emotion Recognition',
    template: '%s | EmotiVoice AI',
  },
  description: 'Advanced AI-powered speech emotion recognition using bidirectional LSTM neural networks. Detect 7 emotions from voice with 94.2% accuracy.',
  keywords: ['speech emotion recognition', 'LSTM', 'AI', 'machine learning', 'audio analysis', 'emotion detection'],
  authors: [{ name: 'EmotiVoice AI' }],
  openGraph: {
    title: 'EmotiVoice AI | Speech Emotion Recognition',
    description: 'Decode human emotions from voice using advanced LSTM neural networks.',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a18',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen`}>
        <ScrollProgress />
        <Navigation />
        <main>{children}</main>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
