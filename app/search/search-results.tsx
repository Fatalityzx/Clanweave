"use client"

import { useEffect, useState } from "react"

interface SearchResult {
  id: string
  title: string
  description: string
  url: string
}

export function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchResults() {
      setIsLoading(true)
      try {
        // Here you would typically call your search API
        // For now, we'll simulate some results
        const simulatedResults = [
          {
            id: "1",
            title: `Result for "${query}"`,
            description: "This is a sample search result description.",
            url: "#",
          },
          // Add more simulated results as needed
        ]
        setResults(simulatedResults)
      } catch (error) {
        console.error("Error fetching search results:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (query) {
      fetchResults()
    }
  }, [query])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!results.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No results found for "{query}"</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {results.map((result) => (
        <div key={result.id} className="group">
          <a href={result.url} className="block space-y-1 hover:no-underline">
            <h2 className="text-lg font-medium group-hover:underline">{result.title}</h2>
            <p className="text-sm text-muted-foreground">{result.description}</p>
          </a>
        </div>
      ))}
    </div>
  )
}

