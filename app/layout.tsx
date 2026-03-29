import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RimRevive Vancouver — Mobile Rim Restoration for Premium Vehicles',
  description: 'We restore your Tesla, BMW, and Audi rims to like-new condition — at your location. No shop visits. No waiting. Premium mobile rim repair in Vancouver.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
