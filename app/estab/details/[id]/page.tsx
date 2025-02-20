"use client"

import { CollapsibleSidebar } from "@/components/layout/collapsible-sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useImportedData } from "@/contexts/ImportedDataContext"

interface TransferHistory {
  date: string
  previously: string
  transferredTo: string
  approvedBy: string
  remarks: string
}

const transferHistory: TransferHistory[] = [
  {
    date: "14/1/2024",
    previously: "OC 'C' Coy",
    transferredTo: "OC xxx",
    approvedBy: "ME5 xxx",
    remarks: "Info 1, 2, 3",
  },
  {
    date: "04/10/2022",
    previously: "OC 'N' Coy",
    transferredTo: "OC 'C' Coy",
    approvedBy: "ME5 xxx",
    remarks: "Info 1, 2, 3",
  },
  {
    date: "20/12/2020",
    previously: "xx",
    transferredTo: "xx",
    approvedBy: "xx",
    remarks: "Info 1, 2, 3",
  },
  {
    date: "17/08/2019",
    previously: "xx",
    transferredTo: "xx",
    approvedBy: "xx",
    remarks: "xx",
  },
  {
    date: "30/01/2018",
    previously: "xx",
    transferredTo: "xx",
    approvedBy: "xx",
    remarks: "xx",
  },
]

export default function EstabDetails() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const { importedData } = useImportedData()

  console.log("Imported data in Estab Details:", importedData)

  const position = importedData?.positions.find((p) => p.ID.toString() === id)
  console.log("Position:", position)

  return (
    <div className="flex min-h-screen">
      <CollapsibleSidebar />
      <div className="flex-1">
        <Header />
        <main className="p-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="flex items-center gap-1 hover:text-gray-700"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <span>Estab</span>
            <span>{">"}</span>
            <span>Details</span>
            <span>{">"}</span>
            <span className="text-gray-900">{position?.Position || id} Details</span>
          </div>

          {/* Title Section */}
          <div className="bg-[#E5F6FD] rounded-lg p-4 mb-6">
            <h1 className="text-lg font-medium">
              Estab Details of {position?.Position || id} {position?.ID ? `(ID: ${position.ID})` : ""}
            </h1>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-1 gap-8 mb-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-600">POSN ID:</div>
                <div>{position?.["POSN ID"] || "N/A"}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-600">Estab Creation Date:</div>
                <div>{position?.["Creation Date"] || "N/A"}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-600">Estab Requirements:</div>
                <Link href={`/estab/requirements/${id}`} className="text-blue-600 hover:underline">
                  Link to Estab Requirement Page
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-600">Other Details:</div>
                <div>{position?.Remarks || "N/A"}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mb-6">
            <Button className="bg-[#0066cc] hover:bg-[#0052a3]">Re-Profiling</Button>
            <Button className="bg-[#0066cc] hover:bg-[#0052a3]">Transfer Estab</Button>
          </div>

          {/* Transfer History Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Previously</TableHead>
                  <TableHead>Transferred to</TableHead>
                  <TableHead>Approved by</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transferHistory.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.previously}</TableCell>
                    <TableCell>{record.transferredTo}</TableCell>
                    <TableCell>{record.approvedBy}</TableCell>
                    <TableCell>{record.remarks}</TableCell>
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

