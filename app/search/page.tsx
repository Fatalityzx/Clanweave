"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { CollapsibleSidebar } from "@/components/layout/collapsible-sidebar"
import { Header } from "@/components/header"
import { useGlobalSearch } from "@/contexts/GlobalSearchContext"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import Link from "next/link"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const { performSearch, searchResults, isSearching } = useGlobalSearch()

  useEffect(() => {
    if (query) {
      performSearch(query)
    }
  }, [query, performSearch])

  return (
    <div className="flex min-h-screen">
      <CollapsibleSidebar />
      <div className="flex-1">
        <Header />
        <main className="p-8">
          <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>

          {isSearching ? (
            <Card className="p-8 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <span className="ml-2 text-gray-600">Searching...</span>
            </Card>
          ) : searchResults.length > 0 ? (
            <div className="bg-white rounded-lg border shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Position</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Rank</TableHead>
                    <TableHead>Personnel</TableHead>
                    <TableHead>POSN ID</TableHead>
                    <TableHead>Matched On</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searchResults.map((result) => (
                    <TableRow key={result.id} className="hover:bg-gray-50">
                      <TableCell>
                        <Link href={`/organization/estab/${result.id}`} className="text-blue-600 hover:underline">
                          {result.title}
                        </Link>
                      </TableCell>
                      <TableCell>{result.details?.unit || "-"}</TableCell>
                      <TableCell>{result.details?.rank || "-"}</TableCell>
                      <TableCell>{result.details?.name || "Vacant"}</TableCell>
                      <TableCell>{result.details?.posnId || "-"}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700">
                          {result.matchedOn}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : query ? (
            <Card className="p-8">
              <div className="text-center">
                <p className="text-gray-500">No results found for "{query}"</p>
                <p className="text-sm text-gray-400 mt-2">Try adjusting your search terms or check the spelling</p>
              </div>
            </Card>
          ) : (
            <Card className="p-8">
              <div className="text-center">
                <p className="text-gray-500">Enter a search term to begin</p>
              </div>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}

