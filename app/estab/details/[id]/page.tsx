"use client"

import { useState, useEffect } from "react"
import { CollapsibleSidebar } from "@/components/layout/collapsible-sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useImportedData } from "@/contexts/ImportedDataContext"
import { ReprofileEstabDialog } from "@/components/reprofile-estab-dialog"
import { TransferEstabDialog } from "@/components/transfer-estab-dialog"
import { VersionHistoryDialog } from "@/components/version-history-dialog"
import { useEstab } from "@/contexts/EstabContext"

export default function EstabDetails() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const { importedData } = useImportedData()
  const { positions, transferHistory, versionHistory, updatePosition, addTransferHistory } = useEstab()
  const [reprofileOpen, setReprofileOpen] = useState(false)
  const [transferOpen, setTransferOpen] = useState(false)
  const [versionHistoryOpen, setVersionHistoryOpen] = useState(false)
  const [forceUpdate, setForceUpdate] = useState(0)

  // Add useEffect to listen for estab updates
  useEffect(() => {
    const handleEstabUpdate = () => {
      setForceUpdate((prev) => prev + 1)
    }

    window.addEventListener("estabUpdated", handleEstabUpdate)
    window.addEventListener("estabTransferred", handleEstabUpdate)

    return () => {
      window.removeEventListener("estabUpdated", handleEstabUpdate)
      window.removeEventListener("estabTransferred", handleEstabUpdate)
    }
  }, [])

  const position = positions?.find((p) => p.id.toString() === id)
  const positionTransferHistory = transferHistory[id] || []

  // Function to convert old position names to new ones
  const getNewPositionName = (oldName: string) => {
    const positionMapping: { [key: string]: string } = {
      CEO: "Hd xyz",
      COO: "Hd 123",
      CTO: "OC 123",
      "Head of HR": "OC xyz",
      "Head of Finance": "OC 456",
      "Head of Engineering": "OC ABC",
      Hd: "Hd xxxx",
      "Delta 1A": "OC 1A",
      "Delta 1B": "OC 1B",
      SM: "SM xxxx",
      "Deputy COO": "Dy Hd",
      "Deputy CTO": "Dy OC",
    }
    return positionMapping[oldName] || oldName
  }

  const handleReprofile = (data: any) => {
    updatePosition(id, {
      ...data,
      requirements: {
        minRank: data.minRank,
        experience: data.experience,
        priority: data.priority,
        readyDate: data.readyDate,
      },
    })
  }

  const handleTransfer = (transferData: any) => {
    addTransferHistory(id, transferData)
  }

  if (!position) {
    return <div>Loading...</div>
  }

  const displayTitle = getNewPositionName(position.title)

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
            <span className="text-gray-900">{displayTitle} Details</span>
          </div>

          {/* Title Section */}
          <div className="bg-[#E5F6FD] rounded-lg p-4 mb-6">
            <h1 className="text-lg font-medium">
              Estab Details of {displayTitle} {position?.id ? `(ID: ${position.id})` : ""}
            </h1>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-1 gap-8 mb-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-600">Title:</div>
                <div>{displayTitle}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-600">POSN ID:</div>
                <div>{position?.posnId || "N/A"}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-600">Rank:</div>
                <div>{position?.rank || "N/A"}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-600">Min Rank:</div>
                <div>{position?.requirements?.minRank || "N/A"}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-600">Experience:</div>
                <div>{position?.requirements?.experience || "N/A"}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-600">Priority:</div>
                <div>{position?.requirements?.priority || "N/A"}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-600">Ready Date:</div>
                <div>{position?.requirements?.readyDate || "N/A"}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-600">Estab Creation Date:</div>
                <div>{position?.creationDate || "N/A"}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-600">Estab Requirements:</div>
                <Link href={`/estab/requirements/${id}`} className="text-blue-600 hover:underline">
                  Link to Estab Requirement Page
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-600">Remarks:</div>
                <div>{position?.remarks || "N/A"}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mb-6">
            <Button className="bg-[#0066cc] hover:bg-[#0052a3]" onClick={() => setReprofileOpen(true)}>
              Re-Profiling
            </Button>
            <Button className="bg-[#0066cc] hover:bg-[#0052a3]" onClick={() => setTransferOpen(true)}>
              Transfer Estab
            </Button>
            <Button variant="outline" onClick={() => setVersionHistoryOpen(true)}>
              View Version History
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
                {positionTransferHistory.length > 0 ? (
                  positionTransferHistory.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{getNewPositionName(record.previously)}</TableCell>
                      <TableCell>{getNewPositionName(record.transferredTo)}</TableCell>
                      <TableCell>{getNewPositionName(record.approvedBy)}</TableCell>
                      <TableCell>{record.remarks}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No transfer history available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
      <ReprofileEstabDialog
        open={reprofileOpen}
        onOpenChange={setReprofileOpen}
        currentEstab={position}
        onReprofile={handleReprofile}
      />
      <TransferEstabDialog
        open={transferOpen}
        onOpenChange={setTransferOpen}
        currentEstab={position}
        onTransfer={handleTransfer}
      />
      <VersionHistoryDialog
        open={versionHistoryOpen}
        onOpenChange={setVersionHistoryOpen}
        versionHistory={versionHistory[id] || []}
      />
    </div>
  )
}

