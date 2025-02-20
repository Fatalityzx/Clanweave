"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { CollapsibleSidebar } from "@/components/layout/collapsible-sidebar"
import { Header } from "@/components/header"
import { useImportedData } from "@/contexts/ImportedDataContext"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q")
  const { importedData } = useImportedData()

  const searchResults =
    importedData?.positions.filter((position) =>
      Object.values(position).some(
        (value) => typeof value === "string" && value.toLowerCase().includes(query?.toLowerCase() || ""),
      ),
    ) || []

  return (
    <div className="flex min-h-screen">
      <CollapsibleSidebar />
      <div className="flex-1">
        <Header />
        <main className="p-8">
          <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
          {searchResults.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Rank</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {searchResults.map((result) => (
                  <TableRow key={result.ID}>
                    <TableCell>{result.ID}</TableCell>
                    <TableCell>{result.Name}</TableCell>
                    <TableCell>{result.Position}</TableCell>
                    <TableCell>{result.Unit}</TableCell>
                    <TableCell>{result.Rank}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No results found.</p>
          )}
        </main>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResults />
    </Suspense>
  )
}

