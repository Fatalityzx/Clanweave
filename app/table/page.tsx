"use client"

import { useState, useMemo } from "react"
import { CollapsibleSidebar } from "@/components/layout/collapsible-sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Pencil, ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useImportedData } from "@/contexts/ImportedDataContext"
import { EmptyStateUpload } from "@/components/empty-state-upload"

type SortField = "ID" | "Name" | "Position" | "Unit" | "Rank" | "POSN ID" | "Creation Date"

export default function TablePage() {
  const { importedData } = useImportedData()

  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<SortField>("ID")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [columnOrder, setColumnOrder] = useState<SortField[]>([
    "ID",
    "Name",
    "Position",
    "Unit",
    "Rank",
    "POSN ID",
    "Creation Date",
  ])
  const recordsPerPage = 10

  console.log("Imported data in Organization Table:", importedData)

  const positions = useMemo(() => importedData?.positions.filter((p) => !p.Section) || [], [importedData])

  console.log("Filtered Positions:", positions)

  const filteredAndSortedData = useMemo(() => {
    return positions
      .filter((item) =>
        Object.values(item).some(
          (value) => typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      )
      .sort((a, b) => {
        if (sortField === "ID") {
          return sortOrder === "asc" ? a.ID - b.ID : b.ID - a.ID
        }

        const fieldMap: { [key: string]: keyof typeof a } = {
          Name: "Name",
          Position: "Position",
          Unit: "Unit",
          Rank: "Rank",
          "POSN ID": "POSN ID",
          "Creation Date": "Creation Date",
        }

        const field = fieldMap[sortField]
        const aValue = (a[field] || "").toString().toLowerCase()
        const bValue = (b[field] || "").toString().toLowerCase()

        return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      })
  }, [positions, searchQuery, sortField, sortOrder])

  const totalRecords = filteredAndSortedData.length
  const totalPages = Math.ceil(totalRecords / recordsPerPage)

  const paginatedData = filteredAndSortedData.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage)

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"))
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(paginatedData.map((row) => row.ID))
    } else {
      setSelectedRows([])
    }
  }

  const handleSelectRow = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, id])
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id))
    }
  }

  const handleColumnSelect = (field: SortField) => {
    setSortField(field)
    if (field !== "ID") {
      const newOrder = ["ID", field, ...columnOrder.filter((col) => col !== "ID" && col !== field)]
      setColumnOrder(newOrder)
    }
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
          <div className="mb-6">
            <div className="text-sm text-gray-500">Organizational {">"} Table</div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2">
              <Input
                type="search"
                placeholder="Search"
                className="w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">Sort</span>
                <Select value={sortField} onValueChange={(value: SortField) => handleColumnSelect(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent>
                    {columnOrder
                      .filter((option) => option !== "ID")
                      .map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSort}>
                Sort{" "}
                {sortOrder === "asc" ? (
                  <ChevronUp className="ml-2 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-2 h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedRows.length === paginatedData.length}
                      onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                    />
                  </TableHead>
                  {columnOrder.map((header) => (
                    <TableHead key={header}>{header}</TableHead>
                  ))}
                  <TableHead className="w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((row) => (
                  <TableRow key={row.ID}>
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.includes(row.ID)}
                        onCheckedChange={(checked) => handleSelectRow(row.ID, checked as boolean)}
                      />
                    </TableCell>
                    {columnOrder.map((header) => (
                      <TableCell key={header}>
                        {header === "ID"
                          ? row.ID
                          : header === "Creation Date"
                            ? row["Creation Date"]
                            : header === "POSN ID"
                              ? row["POSN ID"]
                              : row[header as keyof typeof row] || ""}
                      </TableCell>
                    ))}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Link href={`/organization/estab/${row.ID}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <div>{totalRecords} records found</div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(0, 4)
                .map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "secondary" : "ghost"}
                    size="sm"
                    className="h-8 w-8"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

