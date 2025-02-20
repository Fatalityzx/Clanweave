"use client"

import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface Employee {
  unit: string
  name: string
  estab: string
  posinId: string
  rank: string
  date: string
  language: string
}

export function DataTable({ data }: { data: Employee[] }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input type="file" accept=".xlsx,.csv" className="hidden" id="file-upload" />
        <Button onClick={() => document.getElementById("file-upload")?.click()}>Import File</Button>
        <Button>Import from e-HR</Button>
        <div className="flex-1" />
        <Button variant="outline">Remove file</Button>
        <Button>Generate</Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableHead>Unit</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Estab</TableHead>
            <TableHead>POSIN ID</TableHead>
            <TableHead>Rank</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Language</TableHead>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((employee, index) => (
            <TableRow key={index}>
              <TableCell>{employee.unit}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.estab}</TableCell>
              <TableCell>{employee.posinId}</TableCell>
              <TableCell>{employee.rank}</TableCell>
              <TableCell>{employee.date}</TableCell>
              <TableCell>{employee.language}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

