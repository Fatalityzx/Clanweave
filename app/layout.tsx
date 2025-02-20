import { PriorityRulesProvider } from "@/contexts/PriorityRulesContext"
import { ImportedDataProvider } from "@/contexts/ImportedDataContext"
import { EstabProvider } from "@/contexts/EstabContext"
import { GlobalSearchProvider } from "@/contexts/GlobalSearchContext"
import { Inter } from "next/font/google"
import type React from "react"
import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ImportedDataProvider>
          <PriorityRulesProvider>
            <EstabProvider>
              <GlobalSearchProvider>{children}</GlobalSearchProvider>
            </EstabProvider>
          </PriorityRulesProvider>
        </ImportedDataProvider>
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
