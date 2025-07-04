import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Users App - Lista de Usuarios",
  description: "Aplicación para gestionar y visualizar usuarios",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <main className="min-h-screen bg-background">{children}</main>
      </body>
    </html>
  )
}
