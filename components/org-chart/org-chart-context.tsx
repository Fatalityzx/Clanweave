"use client"

import * as React from "react"
import type { PopupPosition } from "./types"

interface OrgChartContextType {
  selectedSection: string | null
  setSelectedSection: (section: string | null) => void
  zoomLevel: number
  setZoomLevel: (level: number) => void
  selectedNode: PopupPosition | null
  setSelectedNode: (position: PopupPosition | null) => void
}

export const OrgChartContext = React.createContext<OrgChartContextType | undefined>(undefined)

export function OrgChartProvider({ children }: { children: React.ReactNode }) {
  const [selectedSection, setSelectedSection] = React.useState<string | null>(null)
  const [zoomLevel, setZoomLevel] = React.useState(1)
  const [selectedNode, setSelectedNode] = React.useState<PopupPosition | null>(null)

  return (
    <OrgChartContext.Provider
      value={{
        selectedSection,
        setSelectedSection,
        zoomLevel,
        setZoomLevel,
        selectedNode,
        setSelectedNode,
      }}
    >
      {children}
    </OrgChartContext.Provider>
  )
}

export function useOrgChart() {
  const context = React.useContext(OrgChartContext)
  if (context === undefined) {
    throw new Error("useOrgChart must be used within an OrgChartProvider")
  }
  return context
}

