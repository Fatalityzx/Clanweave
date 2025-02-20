"use client"

import { useGlobalSearch } from "@/contexts/GlobalSearchContext"

export function SearchResults() {
  const { searchResults, isSearching } = useGlobalSearch()

  if (isSearching) {
    return <div className="p-2">Searching...</div>
  }

  if (searchResults.length === 0) {
    return <div className="p-2">No results found</div>
  }

  return (
    <div className="absolute top-full left-0 w-full bg-white border rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
      {searchResults.map((result) => (
        <div key={result.id} className="p-2 hover:bg-gray-100 cursor-pointer">
          {result.title}
        </div>
      ))}
    </div>
  )
}

