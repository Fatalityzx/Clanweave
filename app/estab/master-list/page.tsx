"use client"

import { useState, useMemo } from "react"
import { useEstab } from "@/contexts/EstabContext"
import { CollapsibleSidebar } from "@/components/layout/collapsible-sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Plus, AlertCircle } from "lucide-react"
import Link from "next/link"
import { CreateEstabDialog } from "@/components/create-estab-dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function MasterEstabList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const { positions } = useEstab()

  // Find duplicate positions by counting occurrences of each title
  const duplicatePositions = useMemo(() => {
    const positionCounts = positions.reduce(
      (acc, position) => {
        const title = position.title.toLowerCase()
        acc[title] = (acc[title] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.entries(positionCounts)
      .filter(([_, count]) => count > 1)
      .reduce(
        (acc, [title]) => {
          acc[title] = true
          return acc
        },
        {} as Record<string, boolean>,
      )
  }, [positions])

  const filteredPositions = useMemo(() => {
    return positions.filter((position) =>
      Object.values(position).some(
        (value) => typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    )
  }, [positions, searchQuery])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(filteredPositions.map((pos) => pos.id.toString()))
    } else {
      setSelectedRows([])
    }
  }

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, id])
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id))
    }
  }

  return (
    <div className="flex min-h-screen">
      <CollapsibleSidebar />
      <div className="flex-1">
        <Header />
        <main className="p-8">
          <div className="flex items-center justify-between mb-6">
            <Input
              type="search"
              placeholder="Search"
              className="w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button className="bg-[#0066cc] hover:bg-[#0052a3]" onClick={() => setShowCreateDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create New Estab
            </Button>
          </div>

          <h2 className="text-xl font-semibold mb-4">Master Estab List</h2>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedRows.length === filteredPositions.length}
                      onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                    />
                  </TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>POSN ID</TableHead>
                  <TableHead>Rank</TableHead>
                  <TableHead>Creation Date</TableHead>
                  <TableHead>Personnel</TableHead>
                  <TableHead>Remarks</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPositions.map((position) => {
                  const isDuplicate = duplicatePositions[position.title.toLowerCase()]
                  return (
                    <TableRow key={position.id} className={isDuplicate ? "bg-red-50" : undefined}>
                      <TableCell>
                        <Checkbox
                          checked={selectedRows.includes(position.id)}
                          onCheckedChange={(checked) => handleSelectRow(position.id, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell className="flex items-center gap-2">
                        {position.title}
                        {isDuplicate && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <AlertCircle className="h-4 w-4 text-red-500" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Duplicate position found in the list</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </TableCell>
                      <TableCell>{position.posnId}</TableCell>
                      <TableCell>{position.rank}</TableCell>
                      <TableCell>{position.creationDate}</TableCell>
                      <TableCell>{position.personnel}</TableCell>
                      <TableCell>{position.remarks}</TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          <Link href={`/estab/details/${position.id}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <FileText className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          <CreateEstabDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
        </main>
      </div>
    </div>
  )
}

