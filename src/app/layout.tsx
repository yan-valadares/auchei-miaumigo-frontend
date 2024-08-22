import './globals.css'

import { Nunito } from 'next/font/google'

import { LocationProvider } from '@/contexts/LocationContext'

const nunito = Nunito({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={nunito.variable}>
      <LocationProvider>
        <body className="flex min-h-screen items-center justify-center antialiased">
          {children}
        </body>
      </LocationProvider>
    </html>
  )
}
