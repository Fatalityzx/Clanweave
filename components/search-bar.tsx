"use client"

import { useEffect, useState, useRef } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useGlobalSearch } from "@/contexts/GlobalSearchContext"
import { useDebounce } from "@/hooks/use-debounce"
import { SearchResults } from "@/components/search-results"

export function SearchBar() {
  const { searchQuery, setSearchQuery, performSearch } = useGlobalSearch()
  const [localQuery, setLocalQuery] = useState(searchQuery)
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const debouncedQuery = useDebounce(localQuery, 300)

  useEffect(() => {
    if (debouncedQuery !== searchQuery) {
      setSearchQuery(debouncedQuery)
      performSearch(debouncedQuery)
    }
  }, [debouncedQuery, setSearchQuery, searchQuery, performSearch])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative w-full max-w-sm" ref={searchRef}>
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        className="pl-8 pr-4"
        value={localQuery}
        onChange={(e) => {
          setLocalQuery(e.target.value)
          setIsOpen(true)
        }}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && <SearchResults />}
    </div>
  )
}

