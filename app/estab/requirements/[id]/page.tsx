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
}

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
    title: "CTO",
    minRank: "ME6 or Equivalent",
    vocationalReq: "ME",
    studyReq: "Masters/PhD in Computer Science or Engineering",
    remarks: "Proven track record in technology leadership",
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

  const position = importedData?.positions.find((p) => p.ID.toString() === id)

  const filteredSections = defaultRequirementSections.filter((section) =>
    Object.values(section).some((value) => value.toLowerCase().includes(searchQuery.toLowerCase())),
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
                placeholder="Search"
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
                        {section.remarks && <div className="text-sm text-gray-500 italic">{section.remarks}</div>}
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

