"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ImportPage() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    const importedData = sessionStorage.getItem("importedData")
    if (importedData) {
      setData(JSON.parse(importedData))
    }
  }, [])

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-8">
          <div className="mb-6 flex items-center gap-4">
            <Button className="bg-[#0066cc] hover:bg-[#0052a3]" onClick={() => window.history.back()}>
              Back
            </Button>
            <h1 className="text-2xl font-bold">Imported Data</h1>
          </div>

          {data.length > 0 ? (
            <div className="border rounded-lg bg-white overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {data[0].map((header: string, index: number) => (
                      <TableHead key={index}>{header}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.slice(1).map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {row.map((cell: any, cellIndex: number) => (
                        <TableCell key={cellIndex}>{cell}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p>No data imported. Please import an Excel file from the home page.</p>
          )}
        </main>
      </div>
    </div>
  )
}

