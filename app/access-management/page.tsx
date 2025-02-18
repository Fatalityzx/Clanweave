"use client"

import { useState } from "react"
import { CollapsibleSidebar } from "@/components/layout/collapsible-sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

interface AccessRecord {
  id: number
  serial: number
  name: string
  unit: string
  accessStart: string
  accessEnd: string
  accessGroup: string
}

const initialData: AccessRecord[] = [
  {
    id: 1,
    serial: 1,
    name: "Jason Lau",
    unit: "HQ xxxx",
    accessStart: "15/09/2022",
    accessEnd: "07/01/2025",
    accessGroup: "Owner",
  },
  {
    id: 2,
    serial: 2,
    name: "Ong Teng Shun",
    unit: "HQ xxxx",
    accessStart: "25/08/2022",
    accessEnd: "07/01/2025",
    accessGroup: "Read and Write",
  },
  {
    id: 3,
    serial: 3,
    name: "Matthius Lim",
    unit: "xxxx",
    accessStart: "01/12/2024",
    accessEnd: "30/12/2025",
    accessGroup: "Administrator",
  },
  {
    id: 4,
    serial: 4,
    name: "Aloysius Chua",
    unit: "xxxx",
    accessStart: "01/01/2025",
    accessEnd: "30/06/2025",
    accessGroup: "Read Only",
  },
]

export default function AccessManagement() {
  const [selectedUnit, setSelectedUnit] = useState<string>("all")
  const [selectedAccessGroup, setSelectedAccessGroup] = useState<string>("all")
  const [data, setData] = useState<AccessRecord[]>(initialData)
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredData = data.filter((record) => {
    const matchesUnit =
      selectedUnit === "all" ||
      (selectedUnit === "hq" && record.unit.toLowerCase().includes("hq")) ||
      (selectedUnit === "other" && !record.unit.toLowerCase().includes("hq"))
    const matchesAccessGroup =
      selectedAccessGroup === "all" ||
      record.accessGroup.toLowerCase().replace(/\s+/g, "") === selectedAccessGroup.toLowerCase().replace(/\s+/g, "")
    const matchesSearch = Object.values(record).some(
      (value) => typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    return matchesUnit && matchesAccessGroup && matchesSearch
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(filteredData.map((record) => record.id))
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

  return (
    <div className="flex min-h-screen">
      <CollapsibleSidebar />
      <div className="flex-1">
        <Header />
        <main className="p-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="space-y-1.5">
              <label className="text-sm text-gray-600">Unit</label>
              <Select value={selectedUnit} onValueChange={setSelectedUnit}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="--- All ---" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">--- All ---</SelectItem>
                  <SelectItem value="hq">HQ xxxx</SelectItem>
                  <SelectItem value="other">xxxx</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm text-gray-600">Access Group</label>
              <Select value={selectedAccessGroup} onValueChange={setSelectedAccessGroup}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="--- All ---" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">--- All ---</SelectItem>
                  <SelectItem value="owner">Owner</SelectItem>
                  <SelectItem value="readandwrite">Read and Write</SelectItem>
                  <SelectItem value="administrator">Administrator</SelectItem>
                  <SelectItem value="readonly">Read Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1" />

            <div className="space-y-1.5">
              <label className="text-sm text-gray-600">Search</label>
              <Input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[200px]"
              />
            </div>
          </div>

          <div className="border rounded-lg bg-white">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                      onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                    />
                  </TableHead>
                  <TableHead>Serial</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Access period</TableHead>
                  <TableHead>Access Group</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((record, index) => (
                  <TableRow key={record.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.includes(record.id)}
                        onCheckedChange={(checked) => handleSelectRow(record.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell>{record.serial}</TableCell>
                    <TableCell>{record.name}</TableCell>
                    <TableCell>{record.unit}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <input
                          type="date"
                          defaultValue={record.accessStart}
                          className="px-2 py-1 rounded border border-gray-300 w-36"
                        />
                        <span className="text-gray-500">to</span>
                        <input
                          type="date"
                          defaultValue={record.accessEnd}
                          className="px-2 py-1 rounded border border-gray-300 w-36"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select defaultValue={record.accessGroup.toLowerCase().replace(/\s+/g, "")}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="owner">Owner</SelectItem>
                          <SelectItem value="readandwrite">Read and Write</SelectItem>
                          <SelectItem value="administrator">Administrator</SelectItem>
                          <SelectItem value="readonly">Read Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" className="w-full bg-[#0066cc] hover:bg-[#0052a3]">
                        Modify
                      </Button>
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

