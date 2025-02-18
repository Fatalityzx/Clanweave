"use client"

import { useState } from "react"
import { CollapsibleSidebar } from "@/components/layout/collapsible-sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useImportedData } from "@/contexts/ImportedDataContext"
import Link from "next/link"

interface TransferHistory {
  date: string
  previously: string
  transferredTo: string
  approvedBy: string
  remarks: string
}

// Mock data with different position types
const mockPositions = {
  SM: {
    position: "SM",
    unit: "HQ xxxx",
    estabCreationDate: "01/01/2020",
    posnId: "SM001",
    personnelOnEstab: "John Smith",
    requirements: {
      minRank: "ME/CPT or Equivalent",
      vocationalReq: "ME or ...",
      studyReq: "Tech Related Diploma or Equivalent",
      courseReq: "X1, X2, X3, X4, X5",
      languageReq: "Bahasa XXX",
      principals: ["Alpha", "Bravo", "Charlie"],
    },
  },
  HQ: {
    position: "HQ xxxx",
    unit: "HQ xxxx",
    estabCreationDate: "01/01/2020",
    posnId: "HQ001",
    personnelOnEstab: "N/A",
    isOrganizationName: true,
  },
}

const transferHistory: TransferHistory[] = [
  {
    date: "20/5/2024",
    previously: "OC 'C' Coy",
    transferredTo: "OC xxx",
    approvedBy: "ME5 xxx",
    remarks: "Reasoning as to why this was converted from Delta to Delta 1 is such....",
  },
  {
    date: "20/5/2024",
    previously: "OC 'N' Coy",
    transferredTo: "OC 'C' Coy",
    approvedBy: "ME6 xxx",
    remarks: "info 1, 2, 3",
  },
  {
    date: "16/07/2016",
    previously: "OC ABC Coy",
    transferredTo: "NA",
    approvedBy: "COL xxx",
    remarks: "Estab Creation",
  },
]

type ViewType = "details" | "lineage" | "requirements"

export default function EstabDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { importedData } = useImportedData()
  const id = params.id as string
  const [currentView, setCurrentView] = useState<ViewType>("details")

  // Try to find the position in imported data first
  const importedPosition = importedData?.positions.find((p) => p.ID.toString() === id || p.Position === id)

  // If not found in imported data, check mock data
  const mockPosition = mockPositions[id as keyof typeof mockPositions]

  // Use imported data if available, otherwise use mock data
  const position = importedPosition || {
    ID: id,
    Position: mockPosition?.position || id,
    Unit: mockPosition?.unit || "HQ xxxx",
    "Creation Date": mockPosition?.estabCreationDate || "N/A",
    "POSN ID": mockPosition?.posnId || "N/A",
    Name: mockPosition?.personnelOnEstab || "N/A",
    isOrganizationName: mockPosition?.isOrganizationName || false,
    requirements: mockPosition?.requirements || {
      minRank: "N/A",
      vocationalReq: "N/A",
      studyReq: "N/A",
      courseReq: "N/A",
      languageReq: "N/A",
      principals: [],
    },
  }

  // Check if this is just an organization name (like HQ xxxx)
  const isOrganizationName = position.isOrganizationName || position.Position === "HQ xxxx"

  return (
    <div className="flex min-h-screen">
      <CollapsibleSidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 bg-[#F8F9FE]">
          {/* Breadcrumb */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="flex items-center gap-1 hover:text-gray-700 px-0"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
              <span>Organizational Chart</span>
              <span>{">"}</span>
              <span>Table</span>
              <span>{">"}</span>
              <span className="text-gray-900">{position.Position}</span>
            </div>
            {!isOrganizationName && (
              <Button className="bg-[#0066cc] hover:bg-[#0052a3]">Modify Estab from Master Estab List</Button>
            )}
          </div>

          {!isOrganizationName && (
            <div className="space-y-6">
              {/* Profile Card - Always visible */}
              <div className="bg-white rounded-lg p-8">
                <div className="flex items-start gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full bg-[#E5F6FD] flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-[#0066cc]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl font-semibold mb-6">{position.Position}</h1>
                    <div className="grid grid-cols-2 gap-y-6 mb-6">
                      <div>
                        <div className="text-gray-600">Unit:</div>
                        <div>{position.Unit}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Estab Creation Date:</div>
                        <div>{position["Creation Date"]}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">POSN ID:</div>
                        <div>{position["POSN ID"]}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Personnel on Estab:</div>
                        <div>{position.Name || "N/A"}</div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentView(currentView === "lineage" ? "details" : "lineage")}
                      >
                        View Estab Lineage
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setCurrentView(currentView === "requirements" ? "details" : "requirements")}
                      >
                        View Estab Requirements
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Requirements View */}
              {currentView === "requirements" && (
                <div className="bg-[#E5F6FD] rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Estab Requirements for {position.Position}</h2>
                    <Link href={`/estab/requirements/${position.ID}`}>
                      <Button className="bg-[#0066cc] hover:bg-[#0052a3] gap-2">
                        View Other Estab Requirements
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="font-medium mb-2">Min. Rank:</div>
                      <div>{position.requirements?.minRank || "N/A"}</div>
                    </div>
                    <div>
                      <div className="font-medium mb-2">Course requirement:</div>
                      <div>{position.requirements?.courseReq || "N/A"}</div>
                    </div>
                    <div>
                      <div className="font-medium mb-2">Vocational requirement:</div>
                      <div>{position.requirements?.vocationalReq || "N/A"}</div>
                    </div>
                    <div>
                      <div className="font-medium mb-2">Language Requirement:</div>
                      <div>{position.requirements?.languageReq || "N/A"}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="font-medium mb-2">Study requirement:</div>
                      <div>{position.requirements?.studyReq || "N/A"}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Lineage View */}
              {currentView === "lineage" && (
                <div className="bg-[#E5F6FD] rounded-lg">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Estab Lineage</h2>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="text-xs uppercase text-gray-600">Date</TableHead>
                        <TableHead className="text-xs uppercase text-gray-600">Previously</TableHead>
                        <TableHead className="text-xs uppercase text-gray-600">Transferred to</TableHead>
                        <TableHead className="text-xs uppercase text-gray-600">Approved by</TableHead>
                        <TableHead className="text-xs uppercase text-gray-600">Remarks</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transferHistory.map((record, index) => (
                        <TableRow key={index} className="hover:bg-gray-50">
                          <TableCell>{record.date}</TableCell>
                          <TableCell>{record.previously}</TableCell>
                          <TableCell>{record.transferredTo}</TableCell>
                          <TableCell>{record.approvedBy}</TableCell>
                          <TableCell className="max-w-md truncate">{record.remarks}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          )}

          {isOrganizationName && (
            <div className="bg-white rounded-lg p-8">
              <h1 className="text-2xl font-semibold mb-4">{position.Position}</h1>
              <p className="text-gray-600">This is the organization name and does not have establishment details.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

