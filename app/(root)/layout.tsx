import { Metadata } from 'next'
import { ReactNode } from 'react'

import { StreamVideoProvider } from '@/providers/StreamClientProvider'

export const metadata: Metadata = {
  title: 'YOOM',
  description: 'Video calling app',
  icons: {
    icon: '/icons/logo.svg',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  )
}
