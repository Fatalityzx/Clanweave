"use client"

import { useState, useCallback, useEffect } from "react"
import { CollapsibleSidebar } from "@/components/layout/collapsible-sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Plus } from "lucide-react"
import Link from "next/link"
import { useEstab } from "@/contexts/EstabContext"
import { CreateEstabDialog } from "@/components/create-estab-dialog"

export default function MasterEstabList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const { positions } = useEstab()

  const filteredPositions = positions.filter((position) =>
    Object.values(position).some(
      (value) => typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  )

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(filteredPositions.map((pos) => Number(pos.id)))
    } else {
      setSelectedRows([])
    }
  }

  const handleSelectRow = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, id])
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id))
    }
  }

  const [, forceUpdate] = useState({})

  const handleCreateEstab = useCallback(() => {
    setShowCreateDialog(true)
  }, [])

  useEffect(() => {
    // Force a re-render when the component mounts or when positions change
    forceUpdate({})
  }, []) // Removed unnecessary dependency: positions

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
            <Button className="bg-[#0066cc] hover:bg-[#0052a3]" onClick={handleCreateEstab}>
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
                  <TableHead>Estab</TableHead>
                  <TableHead>POSN ID</TableHead>
                  <TableHead>Estab Rank</TableHead>
                  <TableHead>Creation Date</TableHead>
                  <TableHead>Remarks</TableHead>
                  <TableHead className="text-center">Details/Transfer</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPositions.map((position) => (
                  <TableRow key={position.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.includes(Number(position.id))}
                        onCheckedChange={(checked) => handleSelectRow(Number(position.id), checked as boolean)}
                      />
                    </TableCell>
                    <TableCell>{position.title}</TableCell>
                    <TableCell>{position.posnId}</TableCell>
                    <TableCell>{position.estabRank}</TableCell>
                    <TableCell>{position.creationDate}</TableCell>
                    <TableCell>{position.remarks}</TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <Link href={`/estab/master-list/${position.id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <CreateEstabDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
        </main>
      </div>
    </div>
  )
}

