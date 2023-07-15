import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '天気API',
  description: '作成途中の天気APIを用いた何か',
  openGraph: {
    title: '天気API',
    description: '作成途中の天気APIを用いた何か',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
