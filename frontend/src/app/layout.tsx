import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Noto_Kufi_Arabic } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const notoKufi = Noto_Kufi_Arabic({ subsets: ['arabic'], variable: '--font-noto-kufi' })

export const metadata: Metadata = {
  title: 'Benelli Lounge — Menu',
  description: 'Benelli Lounge Erbil — Full Menu',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${notoKufi.variable} bg-[#0a0a0a] text-white`}>
        {children}
      </body>
    </html>
  )
}