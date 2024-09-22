import './globals.css'

export const metadata = {
  title: 'Next.js',
  description: 'Object Storage Upload Example',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
