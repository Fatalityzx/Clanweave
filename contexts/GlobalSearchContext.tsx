"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useImportedData } from "./ImportedDataContext"

interface SearchResult {
  id: string | number
  title: string
  type: "position" | "personnel" | "unit"
  matchedOn: string
  details?: {
    name?: string
    unit?: string
    rank?: string
    posnId?: string
  }
}

interface GlobalSearchContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
  searchResults: SearchResult[]
  isSearching: boolean
  performSearch: (query: string) => void
}

const GlobalSearchContext = createContext<GlobalSearchContextType | undefined>(undefined)

export function GlobalSearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()
  const { importedData } = useImportedData()

  const performSearch = useCallback(
    (query: string) => {
      if (!query.trim()) {
        setSearchResults([])
        return
      }

      setIsSearching(true)
      try {
        const searchTerm = query.toLowerCase()
        const results: SearchResult[] = []

        // Search through positions
        importedData?.positions?.forEach((position) => {
          const matchesPosition = position.Position?.toLowerCase().includes(searchTerm)
          const matchesName = position.Name?.toLowerCase().includes(searchTerm)
          const matchesUnit = position.Unit?.toLowerCase().includes(searchTerm)
          const matchesRank = position.Rank?.toLowerCase().includes(searchTerm)
          const matchesPOSNID = position["POSN ID"]?.toLowerCase().includes(searchTerm)

          if (matchesPosition || matchesName || matchesUnit || matchesRank || matchesPOSNID) {
            const matchedOn = matchesPosition
              ? "position"
              : matchesName
                ? "name"
                : matchesUnit
                  ? "unit"
                  : matchesRank
                    ? "rank"
                    : "POSN ID"

            results.push({
              id: position.ID,
              title: position.Position,
              type: "position",
              matchedOn,
              details: {
                name: position.Name,
                unit: position.Unit,
                rank: position.Rank,
                posnId: position["POSN ID"],
              },
            })
          }
        })

        setSearchResults(results)
      } catch (error) {
        console.error("Search error:", error)
        setSearchResults([])
      } finally {
        setIsSearching(false)
      }
    },
    [importedData],
  )

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query)
      performSearch(query)
      if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      }
    },
    [router, performSearch],
  )

  return (
    <GlobalSearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery: handleSearch,
        searchResults,
        isSearching,
        performSearch,
      }}
    >
      {children}
    </GlobalSearchContext.Provider>
  )
}

export function useGlobalSearch() {
  const context = useContext(GlobalSearchContext)
  if (context === undefined) {
    throw new Error("useGlobalSearch must be used within a GlobalSearchProvider")
  }
  return context
}

