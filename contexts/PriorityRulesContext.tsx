"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface PriorityRules {
  redThreshold: number
  yellowThreshold: number
}

interface PriorityRulesContextType {
  priorityRules: PriorityRules
  updatePriorityRules: (rules: PriorityRules) => void
}

const PriorityRulesContext = createContext<PriorityRulesContextType | undefined>(undefined)

export function PriorityRulesProvider({ children }: { children: ReactNode }) {
  const [priorityRules, setPriorityRules] = useState<PriorityRules>({ redThreshold: 70, yellowThreshold: 60 })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRules = localStorage.getItem("priorityRules")
      if (storedRules) {
        setPriorityRules(JSON.parse(storedRules))
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("priorityRules", JSON.stringify(priorityRules))
    }
  }, [priorityRules])

  const updatePriorityRules = (rules: PriorityRules) => {
    setPriorityRules(rules)
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("priorityRulesUpdated"))
    }
  }

  return (
    <PriorityRulesContext.Provider value={{ priorityRules, updatePriorityRules }}>
      {children}
    </PriorityRulesContext.Provider>
  )
}

export function usePriorityRules() {
  const context = useContext(PriorityRulesContext)
  if (context === undefined) {
    throw new Error("usePriorityRules must be used within a PriorityRulesProvider")
  }
  return context
}

