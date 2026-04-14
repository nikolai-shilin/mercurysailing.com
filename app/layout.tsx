// app/layout.tsx
import type React from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children as React.ReactElement
}
