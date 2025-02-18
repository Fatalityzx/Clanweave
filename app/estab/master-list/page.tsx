"use client"

import { useState } from "react"
import { CollapsibleSidebar } from "@/components/layout/collapsible-sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Plus } from "lucide-react"
import Link from "next/link"
import { useImportedData } from "@/contexts/ImportedDataContext"
import { CreateEstabDialog } from "@/components/create-estab-dialog"

// Default positions to include in master list
const defaultPositions = [
  {
    id: "default-1",
    title: "CEO",
    posnId: "CEO001",
    estabRank: "ME6",
    creationDate: "01/01/2020",
    remarks: "Executive position",
    unit: "HQ xxxx",
  },
  {
    id: "default-2",
    title: "COO",
    posnId: "COO001",
    estabRank: "ME6",
    creationDate: "01/01/2020",
    remarks: "Operations leadership",
    unit: "HQ xxxx",
  },
  {
    id: "default-3",
    title: "Head of Engineering",
    posnId: "ENG001",
    estabRank: "ME5",
    creationDate: "01/01/2020",
    remarks: "Engineering leadership",
    unit: "HQ xxxx",
  },
  {
    id: "default-4",
    title: "Senior Engineer",
    posnId: "ENG002",
    estabRank: "ME4",
    creationDate: "01/01/2020",
    remarks: "Technical leadership",
    unit: "HQ xxxx",
  },
]

export default function MasterEstabList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const { importedData } = useImportedData()

  // Combine imported positions with default positions
  const allPositions = [
    ...defaultPositions,
    ...(importedData?.positions
      .filter((p) => p.Unit === "HQ xxxx")
      .map((p) => ({
        id: p.ID.toString(),
        title: p.Position,
        posnId: p["POSN ID"],
        estabRank: p.Rank,
        creationDate: p["Creation Date"],
        remarks: p.Remarks || "Standard position",
        unit: p.Unit,
        name: p.Name,
      })) || []),
  ]

  // Remove duplicates based on title
  const uniquePositions = allPositions.filter(
    (position, index, self) => index === self.findIndex((p) => p.title === position.title),
  )

  const filteredPositions = uniquePositions.filter((position) =>
    Object.values(position).some(
      (value) => typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  )

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(filteredPositions.map((pos) => pos.id))
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
                {filteredPositions.map((position) => (
                  <TableRow key={position.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.includes(position.id)}
                        onCheckedChange={(checked) => handleSelectRow(position.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell>{position.title}</TableCell>
                    <TableCell>{position.posnId}</TableCell>
                    <TableCell>{position.estabRank}</TableCell>
                    <TableCell>{position.creationDate}</TableCell>
                    <TableCell>{position.name || "Vacant"}</TableCell>
                    <TableCell>{position.remarks}</TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <Link href={`/organization/estab/${position.id}`}>
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

