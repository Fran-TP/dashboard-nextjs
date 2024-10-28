import '@/app/ui/global.css'
import { poppinsFont } from '@/app/ui/fonts'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppinsFont.className} antialiased`}>{children}</body>
    </html>
  )
}
