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
  title: string
  minRank: string
  vocationalReq: string
  studyReq: string
  remarks?: string
  criteria?: string
  priority?: string
  readyDate?: string
  unit?: string
}

const getTransferHistory = (position: string): TransferHistory[] => {
  try {
    // Default transfer history with creation date set to 01/01/2020
    const defaultHistory = [
      {
        date: "01/01/2020",
        previously: "NA",
        transferredTo: position,
        approvedBy: "Initial Approving Authority",
        remarks: "Initial establishment of position",
      },
    ]

    // Specific histories for different position types
    let history: TransferHistory[] = []

    if (position.startsWith("OC")) {
      history = [
        ...defaultHistory,
        {
          date: "15/06/2022",
          previously: position,
          transferredTo: "OC yyy",
          approvedBy: "COL Marcus Chen",
          remarks: "Restructuring of OC positions across units",
        },
        {
          date: "01/12/2023",
          previously: "OC yyy",
          transferredTo: position,
          approvedBy: "ME6 William Tan",
          remarks: "Reallocation of OC position due to operational needs",
        },
      ]
    } else if (position.startsWith("SM")) {
      history = [
        ...defaultHistory,
        {
          date: "15/07/2022",
          previously: position,
          transferredTo: "SM yyyy",
          approvedBy: "COL Marcus Chen",
          remarks: "Consolidation of SM roles in technical oversight",
        },
        {
          date: "01/01/2024",
          previously: "SM yyyy",
          transferredTo: position,
          approvedBy: "ME6 William Tan",
          remarks: "Reallocation of SM position to new department",
        },
      ]
    } else if (position.startsWith("PC")) {
      history = [
        ...defaultHistory,
        {
          date: "15/10/2022",
          previously: position,
          transferredTo: "PC 'zzz' Coy",
          approvedBy: "COL James Wong",
          remarks: "Restructuring of PC positions",
        },
        {
          date: "01/03/2023",
          previously: "PC 'zzz' Coy",
          transferredTo: "PC 'yyy' Coy",
          approvedBy: "ME6 William Tan",
          remarks: "Further restructuring of PC positions",
        },
        {
          date: "15/10/2024",
          previously: "PC 'yyy' Coy",
          transferredTo: position,
          approvedBy: "ME5 David Lee",
          remarks: "Reallocation of PC position within the company",
        },
      ]
    } else if (position.startsWith("Hd")) {
      history = [
        ...defaultHistory,
        {
          date: "01/01/2021",
          previously: position,
          transferredTo: "Hd Admin",
          approvedBy: "BG David Wong",
          remarks: "Transition of HD role from initial to administrative focus",
        },
        {
          date: "01/07/2023",
          previously: "Hd Admin",
          transferredTo: position,
          approvedBy: "BG Marcus Lee",
          remarks: "Realignment of HD position to focus on technological advancements",
        },
      ]
    } else {
      // If no specific history is found, return the default history
      history = defaultHistory
    }

    // Sort the history array by date in descending order
    return history.sort((a, b) => {
      const dateA = new Date(a.date.split("/").reverse().join("-"))
      const dateB = new Date(b.date.split("/").reverse().join("-"))
      return dateB.getTime() - dateA.getTime()
    })
  } catch (error) {
    console.error("Error in getTransferHistory:", error)
    return [] // Return empty array instead of throwing error
  }
}

const getEstabRequirements = (position: string): EstabRequirement => {
  const defaultRequirementSections = [
    {
      title: "Hd xyz",
      minRank: "ME6 or Equivalent",
      vocationalReq: "ME",
      studyReq: "Masters/PhD in Business Administration or related field",
      remarks: "Extensive leadership experience required",
    },
    {
      title: "Hd 123",
      minRank: "ME6 or Equivalent",
      vocationalReq: "ME",
      studyReq: "Masters in Business Administration or Engineering",
      remarks: "Strong operational and strategic planning skills required",
    },
    {
      title: "Hd xxxx",
      minRank: "ME6 or Equivalent",
      vocationalReq: "ME",
      studyReq: "Masters/PhD in Engineering or related technical field",
      remarks: "Strong technical leadership and strategic planning required",
      criteria: "10+ years experience in technical leadership",
      priority: "High",
    },
    {
      title: "OC 1A",
      minRank: "ME4 or Equivalent",
      vocationalReq: "ME",
      studyReq: "Bachelors/Masters in Engineering or related field",
      remarks: "Experience in team leadership and project management",
      criteria: "5+ years experience in engineering management",
      priority: "High",
    },
    {
      title: "OC 1B",
      minRank: "ME4 or Equivalent",
      vocationalReq: "ME",
      studyReq: "Bachelors/Masters in Engineering or related field",
      remarks: "Strong technical background with leadership capabilities",
      criteria: "5+ years experience in technical operations",
      priority: "High",
    },
    {
      title: "OC xxx", // Added requirements for OC xxx
      minRank: "ME4 or Equivalent",
      vocationalReq: "ME",
      studyReq: "Bachelors/Masters in Engineering or related field",
      remarks: "Experience in operations management and team leadership",
      criteria: "5+ years experience in operations management",
      priority: "High",
      readyDate: "01/12/2023",
    },
    {
      title: "PC xxx", // Added requirements for PC xxx
      minRank: "ME2 or Equivalent",
      vocationalReq: "ME",
      studyReq: "Bachelors in Engineering or related field",
      remarks: "Experience in technical operations and team coordination",
      criteria: "3+ years experience in technical operations",
      priority: "Medium",
      readyDate: "01/01/2024",
    },
    {
      title: "PC '1B' Coy", // Added requirements for PC '1B' Coy
      minRank: "ME2 or Equivalent",
      vocationalReq: "ME",
      studyReq: "Bachelors in Engineering or related field",
      remarks: "Experience in company-level operations and team management",
      criteria: "3+ years experience in technical operations",
      priority: "High",
      readyDate: "01/01/2024",
    },
    {
      title: "SM xxxx",
      minRank: "ME3 or Equivalent",
      vocationalReq: "ME",
      studyReq: "Bachelors in Engineering or related technical field",
      remarks: "Experience in technical supervision and team coordination",
      criteria: "3+ years experience in technical operations",
      priority: "Medium",
    },
  ]

  const requirement = defaultRequirementSections.find((req) => req.title === position)
  return (
    requirement || {
      title: position,
      minRank: "Not specified",
      vocationalReq: "Not specified",
      studyReq: "Not specified",
      remarks: "Not specified",
      criteria: "Not specified",
      priority: "Not specified",
      readyDate: "Not specified",
    }
  )
}

export default function EstabDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const { importedData } = useImportedData()
  const id = params.id as string
  const [currentView, setCurrentView] = useState<"details" | "lineage" | "requirements">("details")

  // Decode the URL parameter and handle special characters
  const decodedId = decodeURIComponent(id).replace(/%20/g, " ")

  // Find the position in imported data using multiple matching criteria
  const position = importedData?.positions?.find((p) => {
    try {
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
    } catch (error) {
      console.error("Error in position matching:", error)
      return false
    }
  })

  if (!importedData?.positions) {
    return (
      <div className="flex min-h-screen">
        <CollapsibleSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-8">
            <div className="text-center">
              <p>Loading data...</p>
            </div>
          </main>
        </div>
      </div>
    )
  }

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

  const transferHistory = getTransferHistory(position.Position)
  const requirements = getEstabRequirements(position.Position)

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
                onClick={() => router.push("/organization/structure")}
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

          {/* Profile Card */}
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
                    <div>01/01/2020</div>
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
                      <div>15/10/2024</div>
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

          {/* Updated Requirements View */}
          {currentView === "requirements" && (
            <div className="bg-[#E5F6FD] rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Estab Requirements for {position.Position}</h2>
                <Link href={`/estab/requirements/${position.ID}`}>
                  <Button className="bg-[#0066cc] hover:bg-[#0052a3] gap-2">
                    View Other Estab Requirements
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="font-medium mb-2">Min. Rank:</div>
                    <div>{requirements.minRank}</div>
                  </div>
                  <div>
                    <div className="font-medium mb-2">Vocational requirement:</div>
                    <div>{requirements.vocationalReq}</div>
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-2">Study requirement:</div>
                  <div>{requirements.studyReq}</div>
                </div>
                {requirements.criteria && (
                  <div>
                    <div className="font-medium mb-2">Criteria:</div>
                    <div>{requirements.criteria}</div>
                  </div>
                )}
                {requirements.priority && (
                  <div>
                    <div className="font-medium mb-2">Priority:</div>
                    <div>{requirements.priority}</div>
                  </div>
                )}
                {requirements.readyDate && (
                  <div>
                    <div className="font-medium mb-2">Estab Ready Date:</div>
                    <div>{requirements.readyDate}</div>
                  </div>
                )}
                <div>
                  <div className="font-medium mb-2">Remarks:</div>
                  <div>{requirements.remarks}</div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

