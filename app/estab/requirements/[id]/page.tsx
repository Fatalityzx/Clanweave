"use client"

import { useState } from "react"
import { CollapsibleSidebar } from "@/components/layout/collapsible-sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useImportedData } from "@/contexts/ImportedDataContext"

interface RequirementSection {
  title: string
  minRank: string
  vocationalReq: string
  studyReq: string
  remarks?: string
  id?: string
  position?: string
  criteria?: string
  priority?: string
  readyDate?: string
  unit?: string
}

// Updated requirements data with additional positions
const defaultRequirementSections: RequirementSection[] = [
  {
    title: "CEO",
    minRank: "ME6 or Equivalent",
    vocationalReq: "ME",
    studyReq: "Masters/PhD in Business Administration or related field",
    remarks: "Extensive leadership experience required",
  },
  {
    title: "COO",
    minRank: "ME6 or Equivalent",
    vocationalReq: "ME",
    studyReq: "Masters in Business Administration or Engineering",
    remarks: "Strong operational and strategic planning skills required",
  },
  {
    title: "Delta 1A",
    minRank: "ME4 or Equivalent",
    vocationalReq: "ME",
    studyReq: "Bachelors/Masters in Engineering or related field",
    remarks: "Experience in team leadership and project management",
    criteria: "5+ years experience in engineering management",
    priority: "High",
  },
  {
    title: "Delta 1B",
    minRank: "ME4 or Equivalent",
    vocationalReq: "ME",
    studyReq: "Bachelors/Masters in Engineering or related field",
    remarks: "Strong technical background with leadership capabilities",
    criteria: "5+ years experience in technical operations",
    priority: "High",
  },
  {
    title: "SM",
    minRank: "ME3 or Equivalent",
    vocationalReq: "ME",
    studyReq: "Bachelors in Engineering or related technical field",
    remarks: "Experience in technical supervision and team coordination",
    criteria: "3+ years experience in technical operations",
    priority: "Medium",
  },
  {
    title: "OC xxx",
    minRank: "ME4 or Equivalent",
    vocationalReq: "ME",
    studyReq: "Bachelors/Masters in Engineering or Operations Management",
    remarks: "Strong leadership and operational management skills",
    criteria: "5+ years experience in operations management",
    priority: "High",
  },
  {
    title: "PC '1B' Coy",
    minRank: "ME2 or Equivalent",
    vocationalReq: "ME",
    studyReq: "Bachelors in Engineering or related field",
    remarks: "Experience in team supervision and project execution",
    criteria: "2+ years experience in technical operations",
    priority: "Medium",
  },
  {
    title: "PC 'xxx' Coy",
    minRank: "ME2 or Equivalent",
    vocationalReq: "ME",
    studyReq: "Bachelors in Engineering or related field",
    remarks: "Experience in team leadership and technical operations",
    criteria: "2+ years experience in technical operations",
    priority: "Medium",
  },
  {
    title: "Head of HR",
    minRank: "ME5 or Equivalent",
    vocationalReq: "ME",
    studyReq: "Masters in Human Resources Management",
    remarks: "Experience in organizational development and talent management",
  },
  {
    title: "Head of Finance",
    minRank: "ME5 or Equivalent",
    vocationalReq: "ME",
    studyReq: "Masters in Finance or Accounting, CPA preferred",
    remarks: "Strong financial planning and analysis skills",
  },
  {
    title: "Head of Engineering",
    minRank: "ME5 or Equivalent",
    vocationalReq: "ME",
    studyReq: "Masters in Engineering",
    remarks: "Extensive experience in engineering management",
  },
  {
    title: "Senior Engineer",
    minRank: "ME4 or Equivalent",
    vocationalReq: "ME",
    studyReq: "Bachelors/Masters in Engineering",
    remarks: "Minimum 5 years of engineering experience",
  },
  {
    title: "HR Specialist",
    minRank: "ME3 or Equivalent",
    vocationalReq: "ME",
    studyReq: "Bachelors in Human Resources or related field",
    remarks: "Experience in recruitment and employee relations",
  },
  {
    title: "Financial Analyst",
    minRank: "ME3 or Equivalent",
    vocationalReq: "ME",
    studyReq: "Bachelors in Finance or Accounting",
    remarks: "Strong analytical and forecasting skills",
  },
  {
    title: "Software Engineer",
    minRank: "ME3 or Equivalent",
    vocationalReq: "ME",
    studyReq: "Bachelors in Computer Science or related field",
    remarks: "Proficiency in multiple programming languages",
  },
  {
    title: "Deputy COO",
    minRank: "ME5 or Equivalent",
    vocationalReq: "ME",
    studyReq: "Masters in Business Administration or related field",
    remarks: "Strong operational and leadership skills",
  },
  {
    title: "Project Manager",
    minRank: "ME4 or Equivalent",
    vocationalReq: "ME",
    studyReq: "Bachelors/Masters in Project Management or related field",
    remarks: "PMP certification preferred",
  },
  {
    title: "Systems Analyst",
    minRank: "ME3 or Equivalent",
    vocationalReq: "ME",
    studyReq: "Bachelors in Information Systems or Computer Science",
    remarks: "Experience in systems analysis and design",
  },
  {
    title: "Financial Controller",
    minRank: "ME4 or Equivalent",
    vocationalReq: "ME",
    studyReq: "Masters in Accounting or Finance, CPA required",
    remarks: "Experience in financial reporting and compliance",
  },
  {
    title: "Software Developer",
    minRank: "ME2 or Equivalent",
    vocationalReq: "ME",
    studyReq: "Bachelors in Computer Science or related field",
    remarks: "Strong coding skills in relevant programming languages",
  },
]

export default function EstabRequirementsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const params = useParams()
  const { importedData } = useImportedData()
  const id = params.id as string

  // Get all HQ xxxx positions
  const hqPositions = importedData?.positions.filter((p) => p.Unit === "HQ xxxx") || []

  // Convert positions to requirement sections
  const importedRequirementSections: RequirementSection[] = hqPositions.map((p) => ({
    id: p.ID.toString(),
    title: p.Position,
    position: p.Position,
    minRank: p.Rank,
    vocationalReq: "ME", // Default vocational requirement
    studyReq:
      p.Criteria ||
      defaultRequirementSections.find((r) => r.title === p.Position)?.studyReq ||
      "Bachelors in relevant field",
    remarks:
      p.Remarks ||
      defaultRequirementSections.find((r) => r.title === p.Position)?.remarks ||
      "Experience in relevant field required",
    criteria:
      p.Criteria ||
      defaultRequirementSections.find((r) => r.title === p.Position)?.criteria ||
      "Technical expertise in relevant domain",
    priority: p.Priority || defaultRequirementSections.find((r) => r.title === p.Position)?.priority || "Medium",
    readyDate: p["Estab Ready Date"],
    unit: p.Unit,
  }))

  // Combine default and imported requirement sections
  const combinedRequirementSections = [...defaultRequirementSections, ...importedRequirementSections]

  // Remove duplicates based on title
  const uniqueRequirementSections = combinedRequirementSections.filter(
    (section, index, self) => index === self.findIndex((t) => t.title === section.title),
  )

  const filteredSections = uniqueRequirementSections.filter((section) =>
    Object.values(section).some(
      (value) => typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  )

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
            <span>Requirements</span>
          </div>

          {/* Search Section */}
          <div className="mb-6">
            <div className="flex gap-2 max-w-md">
              <Input
                type="search"
                placeholder="Search requirements"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          {/* Requirements Sections */}
          <div className="space-y-4">
            {filteredSections.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredSections.map((section) => (
                  <AccordionItem key={section.title} value={section.title}>
                    <AccordionTrigger className="bg-[#E5F6FD] hover:bg-[#d5f0fa] px-4 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{section.title}</span>
                        <span className="text-sm text-gray-500">({section.minRank})</span>
                        <ChevronRight className="h-4 w-4 transition-transform duration-200" />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="bg-white border rounded-lg mt-2 p-4">
                      <div className="space-y-4">
                        <div>
                          <div className="font-medium">Min. Rank:</div>
                          <div>{section.minRank}</div>
                        </div>
                        <div>
                          <div className="font-medium">Vocational requirement:</div>
                          <div>{section.vocationalReq}</div>
                        </div>
                        <div>
                          <div className="font-medium">Study requirement:</div>
                          <div>{section.studyReq}</div>
                        </div>
                        {section.criteria && (
                          <div>
                            <div className="font-medium">Criteria:</div>
                            <div>{section.criteria}</div>
                          </div>
                        )}
                        {section.priority && (
                          <div>
                            <div className="font-medium">Priority:</div>
                            <div>{section.priority}</div>
                          </div>
                        )}
                        {section.readyDate && (
                          <div>
                            <div className="font-medium">Estab Ready Date:</div>
                            <div>{section.readyDate}</div>
                          </div>
                        )}
                        {section.remarks && (
                          <div>
                            <div className="font-medium">Remarks:</div>
                            <div>{section.remarks}</div>
                          </div>
                        )}
                        {section.unit && (
                          <div>
                            <div className="font-medium">Unit:</div>
                            <div>{section.unit}</div>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-8 text-gray-500">No requirements found matching your search.</div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

