"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Position {
  ID: number
  Name?: string
  Position: string
  "Parent ID"?: number
  Unit: string
  Rank: string
  "POSN ID": string
  "Creation Date": string
  "Vacant Since"?: string
  Criteria?: string
  Priority?: string
  "Estab Ready Date"?: string
  Remarks?: string
  Section?: string
}

interface ImportedData {
  positions: Position[]
}

interface ImportedDataContextType {
  importedData: ImportedData | null
  setImportedData: React.Dispatch<React.SetStateAction<ImportedData | null>>
}

const ImportedDataContext = createContext<ImportedDataContextType>({
  importedData: null,
  setImportedData: () => null,
})

export function useImportedData() {
  const context = useContext(ImportedDataContext)
  if (!context) {
    throw new Error("useImportedData must be used within an ImportedDataProvider")
  }
  return context
}

export function ImportedDataProvider({ children }: { children: ReactNode }) {
  const [importedData, setImportedData] = useState<ImportedData | null>(null)

  useEffect(() => {
    // Only access localStorage on the client side
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("importedData")
      if (storedData) {
        setImportedData(JSON.parse(storedData))
      }
    }
  }, [])

  useEffect(() => {
    // Only update localStorage on the client side
    if (typeof window !== "undefined" && importedData) {
      localStorage.setItem("importedData", JSON.stringify(importedData))
    }
  }, [importedData])

  return (
    <ImportedDataContext.Provider value={{ importedData, setImportedData }}>{children}</ImportedDataContext.Provider>
  )
}

