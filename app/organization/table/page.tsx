"use client"

import { useState, useMemo } from "react"
import { CollapsibleSidebar } from "@/components/layout/collapsible-sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Pencil } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useImportedData } from "@/contexts/ImportedDataContext"
import { EmptyStateUpload } from "@/components/empty-state-upload"

export default function TablePage() {
  const { importedData } = useImportedData()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<string>("ID")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const recordsPerPage = 10

  const positions = useMemo(() => importedData?.positions.filter((p) => !p.Section) || [], [importedData])

  // ... rest of your existing filtering and sorting logic ...

  const handleEditEstab = (id: string | number) => {
    router.push(`/estab/master-list/${id}`)
  }

  if (!importedData?.positions || importedData.positions.length === 0) {
    return (
      <div className="flex min-h-screen">
        <CollapsibleSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-8 flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
            <EmptyStateUpload />
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <CollapsibleSidebar />
      <div className="flex-1">
        <Header />
        <main className="p-8">
          {/* ... existing search and filter controls ... */}

          <div className="border rounded-lg">
            <Table>
              <TableHeader>{/* ... existing table headers ... */}</TableHeader>
              <TableBody>
                {positions.map((position) => (
                  <TableRow key={position.ID}>
                    {/* ... other table cells ... */}
                    <TableCell>
                      <div className="flex items-center gap-2 justify-center">
                        <Link href={`/organization/estab/${position.ID}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleEditEstab(position.ID)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  )
}

