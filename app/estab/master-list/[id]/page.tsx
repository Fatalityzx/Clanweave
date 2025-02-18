"use client"

import { useState } from "react"
import { CollapsibleSidebar } from "@/components/layout/collapsible-sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { TransferEstabDialog, type TransferData } from "@/components/transfer-estab-dialog"
import { useEstab } from "@/contexts/EstabContext"

export default function EstabDetails({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [showTransferDialog, setShowTransferDialog] = useState(false)
  const { positions, transferHistory, addTransferHistory } = useEstab()

  const position = positions.find((p) => p.id.toString() === params.id)
  const history = transferHistory[params.id] || []

  if (!position) {
    return <div>Position not found</div>
  }

  const handleTransfer = (transferData: TransferData) => {
    addTransferHistory(params.id, transferData)
  }

  return (
    <div className="flex min-h-screen">
      <CollapsibleSidebar />
      <div className="flex-1">
        <Header />
        <main className="p-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/estab/master-list" className="flex items-center gap-1 hover:text-gray-700">
              <ChevronLeft className="h-4 w-4" />
              Back
            </Link>
            <span>Estab</span>
            <span>{">"}</span>
            <span>Dashboard</span>
            <span>{">"}</span>
            <span className="text-gray-900">OC Details</span>
          </div>

          {/* Title Section */}
          <div className="bg-[#E5F6FD] rounded-lg p-4 mb-6">
            <h1 className="text-lg font-medium">Estab Details of {position.title}</h1>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-1 gap-8 mb-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-600">POSN ID:</div>
                <div>{position.posnId}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-600">Estab Creation Date:</div>
                <div>{position.creationDate}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-600">Estab Requirements:</div>
                <Link href={`/estab/requirements/${params.id}`} className="text-blue-600 hover:underline">
                  Link to Estab Requirement Page
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-600">Other Details:</div>
                <div>{position.remarks}</div>
              </div>
              {position.lastTransfer && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-600">Last Transfer:</div>
                  <div>{`Transferred from ${position.lastTransfer.previously} on ${position.lastTransfer.date}`}</div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mb-6">
            <Button className="bg-[#0066cc] hover:bg-[#0052a3]">Re-Profiling</Button>
            <Button className="bg-[#0066cc] hover:bg-[#0052a3]" onClick={() => setShowTransferDialog(true)}>
              Transfer Estab
            </Button>
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
                {history.map((record, index) => (
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

          <TransferEstabDialog
            open={showTransferDialog}
            onOpenChange={setShowTransferDialog}
            currentEstab={position.title}
            onTransfer={handleTransfer}
          />
        </main>
      </div>
    </div>
  )
}

