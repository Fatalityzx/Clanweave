"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { CollapsibleSidebar } from "@/components/layout/collapsible-sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useImportedData } from "@/contexts/ImportedDataContext"

interface TransferHistory {
  date: string
  previously: string
  transferredTo: string
  approvedBy: string
  remarks: string
}

interface EstabRequirement {
  minRank: string
  criteria: string
  priority: string
  remarks: string
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

const estabRequirements: { [key: string]: EstabRequirement } = {
  "SM xxxx": {
    // Changed from SM
    minRank: "ME3",
    criteria: "3+ years experience in technical operations, supervisory skills",
    priority: "Medium",
    remarks: "Key role in coordinating technical teams and operations",
  },
  "OC 1A": {
    // Changed from Delta 1A
    minRank: "ME4",
    criteria: "5+ years experience in engineering management, leadership skills",
    priority: "High",
    remarks: "Critical position overseeing major technical operations",
  },
  "OC 1B": {
    // Changed from Delta 1B
    minRank: "ME4",
    criteria: "5+ years experience in technical project management",
    priority: "High",
    remarks: "Responsible for leading complex technical projects",
  },
  "OC xxx": {
    minRank: "ME4",
    criteria: "7+ years experience in operations management, strategic planning skills",
    priority: "High",
    remarks: "Key leadership role in operational command",
  },
  "PC '1B' Coy": {
    minRank: "ME2",
    criteria: "2+ years experience in team leadership, technical proficiency",
    priority: "Medium",
    remarks: "Responsible for leading and managing a technical team",
  },
  "PC 'xxx' Coy": {
    minRank: "ME2",
    criteria: "2+ years experience in project coordination, technical background",
    priority: "Medium",
    remarks: "Oversees specific technical projects and team performance",
  },
  "Hd xxxx": {
    // Changed from HD
    minRank: "ME6",
    criteria: "10+ years experience in senior leadership, strategic vision",
    priority: "Critical",
    remarks: "Top leadership position, responsible for overall direction and strategy",
  },
}

type ViewType = "details" | "lineage" | "requirements"

export default function EstabDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const { importedData } = useImportedData()
  const id = params.id as string
  const [currentView, setCurrentView] = useState<ViewType>("details")

  // Decode the URL parameter and handle special characters
  const decodedId = decodeURIComponent(id).replace(/%20/g, " ")

  // Find the position in imported data using multiple matching criteria
  const position = importedData?.positions.find((p) => {
    // Try matching by ID first
    if (p.ID.toString() === decodedId) return true

    // Then try matching by Position name (case insensitive and normalized)
    const normalizedPosition = p.Position.toLowerCase().replace(/[^a-z0-9]/g, "")
    const normalizedId = decodedId.toLowerCase().replace(/[^a-z0-9]/g, "")

    if (normalizedPosition === normalizedId) return true

    // Try matching by POSN ID
    if (p["POSN ID"] === decodedId) return true

    // Try matching by exact position name
    if (p.Position === decodedId) return true

    return false
  })

  if (!position) {
    return (
      <div className="flex min-h-screen">
        <CollapsibleSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-8">
            <div className="text-center">
              <p>Position not found: {decodedId}</p>
              <Button className="mt-4" onClick={() => router.back()}>
                Go Back
              </Button>
            </div>
          </main>
        </div>
      </div>
    )
  }

  const requirements = estabRequirements[position.Position] || {
    minRank: position.Rank,
    criteria: "Not specified",
    priority: "Not specified",
    remarks: "Not specified",
  }

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
                onClick={() => {
                  router.push("/organization/structure")
                }}
                className="flex items-center gap-1 hover:text-gray-700 px-0"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Structure
              </Button>
              <span>Organizational Chart</span>
              <span>{">"}</span>
              <span>Structure</span>
              <span>{">"}</span>
              <span className="text-gray-900">{position.Position}</span>
            </div>
            <Button className="bg-[#0066cc] hover:bg-[#0052a3]" onClick={() => router.push("/estab/master-list")}>
              Modify Estab from Master Estab List
            </Button>
          </div>

          {/* Profile Card - Always visible */}
          <div className="bg-white rounded-lg p-8 mb-6">
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
                    <div>
                      {position.Name ? (
                        <Link
                          href={`/personnel/${position.Name.replace(/\s+/g, "-").toLowerCase()}`}
                          className="text-blue-600 hover:underline"
                        >
                          {position.Name}
                        </Link>
                      ) : (
                        "Vacant"
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Rank:</div>
                    <div>{position.Rank}</div>
                  </div>
                  {position["Vacant Since"] && (
                    <div>
                      <div className="text-gray-600">Vacant Since:</div>
                      <div>{position["Vacant Since"]}</div>
                    </div>
                  )}
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
                  <div>{requirements.minRank}</div>
                </div>
                <div>
                  <div className="font-medium mb-2">Criteria:</div>
                  <div>{requirements.criteria}</div>
                </div>
                <div>
                  <div className="font-medium mb-2">Priority:</div>
                  <div>{requirements.priority}</div>
                </div>
                <div>
                  <div className="font-medium mb-2">Estab Ready Date:</div>
                  <div>{position["Estab Ready Date"] || "Not specified"}</div>
                </div>
                <div className="col-span-2">
                  <div className="font-medium mb-2">Remarks:</div>
                  <div>{requirements.remarks}</div>
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
        </main>
      </div>
    </div>
  )
}

