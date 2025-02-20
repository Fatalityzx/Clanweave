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
import { CreateEstabDialog } from "@/components/create-estab-dialog"
import { useParams } from "next/navigation"

// Update the defaultPositions array
const defaultPositions = [
  {
    id: "1",
    title: "Hd xyz", // Changed from CEO
    posnId: "CEO001",
    estabRank: "ME6",
    creationDate: "01/01/2020",
    remarks: "Executive position",
    personnel: "John Doe",
  },
  {
    id: "2",
    title: "Hd 123", // Changed from COO
    posnId: "COO001",
    estabRank: "ME5",
    creationDate: "01/01/2020",
    remarks: "Operations leadership",
    personnel: "Jane Smith",
  },
  {
    id: "3",
    title: "OC 123", // Changed from CTO
    posnId: "CTO001",
    estabRank: "ME5",
    creationDate: "01/01/2020",
    remarks: "Technical leadership",
    personnel: "Bob Johnson",
  },
  {
    id: "4",
    title: "OC xyz", // Changed from Head of HR
    posnId: "HR001",
    estabRank: "ME4",
    creationDate: "01/01/2020",
    remarks: "HR leadership",
    personnel: "Alice Brown",
  },
  {
    id: "5",
    title: "OC 456", // Changed from Head of Finance
    posnId: "FIN001",
    estabRank: "ME4",
    creationDate: "01/01/2020",
    remarks: "Finance leadership",
    personnel: "Charlie Davis",
  },
  {
    id: "6",
    title: "OC ABC", // Changed from Head of Engineering
    posnId: "ENG001",
    estabRank: "ME5",
    creationDate: "01/01/2020",
    remarks: "Engineering leadership",
    personnel: "David Wilson",
  },
  {
    id: "7",
    title: "HR Specialist",
    posnId: "HR002",
    estabRank: "ME2",
    creationDate: "01/01/2021",
    remarks: "HR operations",
    personnel: "Grace Lee",
  },
  {
    id: "8",
    title: "Financial Analyst",
    posnId: "FIN002",
    estabRank: "ME2",
    creationDate: "01/01/2021",
    remarks: "Financial analysis",
    personnel: "Henry Wang",
  },
  {
    id: "9",
    title: "Hd xxxx", // Changed from Hd
    posnId: "ENG555",
    estabRank: "ME6",
    creationDate: "01/01/2022",
    remarks: "Standard position",
    personnel: "Harry",
  },
  {
    id: "10",
    title: "OC 1A", // Changed from Delta 1A
    posnId: "ENG556",
    estabRank: "ME4",
    creationDate: "01/01/2022",
    remarks: "Standard position",
    personnel: "Wane",
  },
  {
    id: "11",
    title: "OC 1B", // Changed from Delta 1B
    posnId: "ENG557",
    estabRank: "ME4",
    creationDate: "01/01/2022",
    remarks: "Standard position",
    personnel: "Rooney",
  },
  {
    id: "12",
    title: "OC xxx",
    posnId: "ENG558",
    estabRank: "ME4",
    creationDate: "01/01/2022",
    remarks: "Standard position",
    personnel: "Jerry",
  },
  {
    id: "13",
    title: "SM xxxx", // Changed from SM
    posnId: "ENG560",
    estabRank: "ME3",
    creationDate: "01/01/2022",
    remarks: "Standard position",
    personnel: "Watsons",
  },
  {
    id: "14",
    title: "PC '1B' Coy",
    posnId: "ENG559",
    estabRank: "ME2",
    creationDate: "01/01/2022",
    remarks: "Standard position",
    personnel: "Tommy",
  },
  {
    id: "15",
    title: "PC 'xxx' Coy",
    posnId: "ENG560",
    estabRank: "ME2",
    creationDate: "01/01/2022",
    remarks: "Standard position",
    personnel: "Hans",
  },
  {
    id: "16",
    title: "Dy Hd", // Changed from Deputy COO
    posnId: "COO002",
    estabRank: "ME4",
    creationDate: "01/02/2023",
    remarks: "Operations management",
    personnel: "Vacant",
  },
  {
    id: "17",
    title: "Senior HR Specialist",
    posnId: "HR003",
    estabRank: "ME3",
    creationDate: "01/03/2023",
    remarks: "Senior HR role",
    personnel: "Vacant",
  },
  {
    id: "18",
    title: "Project Manager",
    posnId: "ENG004",
    estabRank: "ME3",
    creationDate: "01/04/2023",
    remarks: "Project management",
    personnel: "Vacant",
  },
  {
    id: "19",
    title: "Systems Analyst",
    posnId: "ENG005",
    estabRank: "ME2",
    creationDate: "01/05/2023",
    remarks: "Systems analysis",
    personnel: "Vacant",
  },
  {
    id: "20",
    title: "Financial Controller",
    posnId: "FIN003",
    estabRank: "ME4",
    creationDate: "01/06/2023",
    remarks: "Financial control",
    personnel: "Vacant",
  },
  {
    id: "21",
    title: "Software Developer",
    posnId: "ENG006",
    estabRank: "ME2",
    creationDate: "01/07/2023",
    remarks: "Software development",
    personnel: "Vacant",
  },
  {
    id: "22",
    title: "Dy OC", // Changed from Deputy CTO
    posnId: "CTO002",
    estabRank: "ME4",
    creationDate: "01/08/2023",
    remarks: "Technical management",
    personnel: "Vacant",
  },
  {
    id: "23",
    title: "Head of Cybersecurity",
    posnId: "CTO003",
    estabRank: "ME4",
    creationDate: "15/08/2023",
    remarks: "Cybersecurity leadership",
    personnel: "Vacant",
  },
  {
    id: "24",
    title: "Senior Data Analyst",
    posnId: "ENG007",
    estabRank: "ME3",
    creationDate: "01/09/2023",
    remarks: "Data analysis",
    personnel: "Vacant",
  },
  {
    id: "25",
    title: "Operations Manager",
    posnId: "COO003",
    estabRank: "ME3",
    creationDate: "15/09/2023",
    remarks: "Operations management",
    personnel: "Vacant",
  },
  {
    id: "26",
    title: "IT Support Specialist",
    posnId: "ENG008",
    estabRank: "ME2",
    creationDate: "01/10/2023",
    remarks: "IT support",
    personnel: "Vacant",
  },
  {
    id: "27",
    title: "Junior Accountant",
    posnId: "FIN004",
    estabRank: "ME1",
    creationDate: "15/10/2023",
    remarks: "Entry level accounting",
    personnel: "Vacant",
  },
  {
    id: "28",
    title: "Network Engineer",
    posnId: "ENG009",
    estabRank: "ME2",
    creationDate: "01/11/2023",
    remarks: "Network infrastructure",
    personnel: "Vacant",
  },
  {
    id: "29",
    title: "Business Analyst",
    posnId: "BUS001",
    estabRank: "ME3",
    creationDate: "15/11/2023",
    remarks: "Business analysis",
    personnel: "Vacant",
  },
  {
    id: "30",
    title: "Test Transfer",
    posnId: "TEST001",
    estabRank: "ME5",
    creationDate: "01/02/2024",
    remarks: "Testing",
    personnel: "Vacant",
  },
]

export default function MasterEstabList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  const params = useParams()
  const id = params.id

  const filteredPositions = defaultPositions.filter((position) =>
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
                    <TableCell>{position.personnel}</TableCell>
                    <TableCell>{position.remarks}</TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <Link href={`/estab/details/${position.id}`} key={position.id}>
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

