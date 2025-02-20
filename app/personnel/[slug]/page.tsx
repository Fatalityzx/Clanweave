"use client"

import { useState, useEffect } from "react"
import { CollapsibleSidebar } from "@/components/layout/collapsible-sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { ChevronLeft, Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { AddCourseDialog } from "@/components/add-course-dialog"
import { useImportedData } from "@/contexts/ImportedDataContext"

interface Course {
  id: string
  name: string
  commencementDate: string
  completionDate: string
  rankDuring: string
  criteria: string
}

interface UpcomingCourse {
  id: string
  name: string
  expectedDate: string
  criteria: string
}

function generateCourses(rank: string, position: string): Course[] {
  const baseYear = 2020
  const maxCompletionDate = new Date("2025-01-31")
  const courses: Course[] = []

  const courseTemplates = {
    ME1: [
      { name: "Basic Leadership", criteria: "Junior Engineer" },
      { name: "Technical Fundamentals", criteria: "Technical Specialist" },
    ],
    ME2: [
      { name: "Intermediate Leadership", criteria: "Team Lead" },
      { name: "Advanced Technical Skills", criteria: "Senior Technical Specialist" },
    ],
    ME3: [
      { name: "Advanced Leadership", criteria: "Section Head" },
      { name: "Project Management", criteria: "Project Manager" },
    ],
    ME4: [
      { name: "Strategic Leadership", criteria: "Department Manager" },
      { name: "Organizational Management", criteria: "Operations Manager" },
    ],
    ME5: [
      { name: "Executive Leadership", criteria: "Director" },
      { name: "Strategic Planning", criteria: "Chief of Staff" },
    ],
    ME6: [
      { name: "Senior Executive Program", criteria: "Deputy Head" },
      { name: "Policy and Governance", criteria: "Head of Department" },
    ],
  }

  const positionSpecificCourses = {
    "OC 1A": [
      { name: "Delta Operations", criteria: "OC 1A" },
      { name: "Strategic Communications", criteria: "OC 1A" },
    ],
    "OC 1B": [
      { name: "Delta Tactics", criteria: "OC 1B" },
      { name: "Resource Management", criteria: "OC 1B" },
    ],
    "SM xxxx": [
      { name: "Security Management", criteria: "SM xxxx" },
      { name: "Risk Assessment", criteria: "SM xxxx" },
    ],
    "OC xxx": [
      { name: "Company Command", criteria: "OC xxx" },
      { name: "Tactical Operations", criteria: "OC xxx" },
    ],
    "PC '1B' Coy": [
      { name: "Platoon Leadership", criteria: "PC '1B' Coy" },
      { name: "Small Unit Tactics", criteria: "PC '1B' Coy" },
    ],
    "PC 'xxx' Coy": [
      { name: "Special Operations", criteria: "PC 'xxx' Coy" },
      { name: "Advanced Combat Techniques", criteria: "PC 'xxx' Coy" },
    ],
    "Hd xxxx": [
      { name: "Department Management", criteria: "Hd xxxx" },
      { name: "Strategic Planning", criteria: "Hd xxxx" },
    ],
  }

  const ranks = ["ME1", "ME2", "ME3", "ME4", "ME5", "ME6"]
  const currentRankIndex = ranks.indexOf(rank)
  const startRankIndex = currentRankIndex >= 3 ? 3 : 0 // Start from ME4 for ME4 and above

  let currentYear = baseYear
  for (let i = startRankIndex; i <= currentRankIndex; i++) {
    const currentRank = ranks[i]
    const rankCourses = courseTemplates[currentRank as keyof typeof courseTemplates] || []

    for (const course of rankCourses) {
      const commencementDate = new Date(currentYear, 2, 1) // March 1st
      const completionDate = new Date(currentYear, 5, 30) // June 30th

      if (completionDate > maxCompletionDate) {
        break
      }

      courses.push({
        id: `${currentRank}-${courses.length + 1}`,
        name: course.name,
        commencementDate: commencementDate.toLocaleDateString("en-GB"),
        completionDate: completionDate.toLocaleDateString("en-GB"),
        rankDuring: currentRank,
        criteria: course.criteria,
      })

      currentYear++
    }
  }

  const specificCourses = positionSpecificCourses[position as keyof typeof positionSpecificCourses] || []
  for (const course of specificCourses) {
    const commencementDate = new Date(currentYear, 8, 1) // September 1st
    const completionDate = new Date(currentYear, 11, 15) // December 15th

    if (completionDate > maxCompletionDate) {
      break
    }

    courses.push({
      id: `${position}-${courses.length + 1}`,
      name: course.name,
      commencementDate: commencementDate.toLocaleDateString("en-GB"),
      completionDate: completionDate.toLocaleDateString("en-GB"),
      rankDuring: rank,
      criteria: course.criteria,
    })

    currentYear++
  }

  return courses
}

export default function PersonnelDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [showAddCourseDialog, setShowAddCourseDialog] = useState(false)
  const [completedCourses, setCompletedCourses] = useState<Course[]>([])
  const [upcomingCourses, setUpcomingCourses] = useState<UpcomingCourse[]>([])
  const { importedData } = useImportedData()

  const name = params.slug
    ? params.slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : ""

  useEffect(() => {
    if (importedData && importedData.positions) {
      const personnel = importedData.positions.find((p) => p.Name && p.Name.toLowerCase() === name.toLowerCase())
      if (personnel) {
        const generatedCourses = generateCourses(personnel.Rank, personnel.Position)
        setCompletedCourses(generatedCourses)

        const nextYear = new Date().getFullYear() + 1
        const upcomingCourse: UpcomingCourse = {
          id: "upcoming-1",
          name: "Advanced " + personnel.Position + " Course",
          expectedDate: `01/03/${nextYear > 2025 ? 2025 : nextYear}`,
          criteria: personnel.Position,
        }
        setUpcomingCourses([upcomingCourse])
      }
    }
  }, [importedData, name])

  const handleAddCourse = (courseData: { name: string; expectedDate: string; criteria: string }) => {
    const newCourse: UpcomingCourse = {
      id: Date.now().toString(),
      name: courseData.name,
      expectedDate: courseData.expectedDate,
      criteria: courseData.criteria,
    }
    setUpcomingCourses([...upcomingCourses, newCourse])
  }

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
              className="flex items-center gap-1 hover:text-gray-700 px-0"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <span>Organizational Chart</span>
            <span>{">"}</span>
            <span>Table</span>
            <span>{">"}</span>
            <span className="text-gray-900">{name}</span>
          </div>

          {/* Course History */}
          <Card className="mb-6">
            <div className="p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Course History</h2>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Courses Completed</TableHead>
                    <TableHead>Commencement Date</TableHead>
                    <TableHead>Date of Completion</TableHead>
                    <TableHead>Rank during Course</TableHead>
                    <TableHead>Criteria for Estab</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>{course.name}</TableCell>
                      <TableCell>{course.commencementDate}</TableCell>
                      <TableCell>{course.completionDate}</TableCell>
                      <TableCell>{course.rankDuring}</TableCell>
                      <TableCell>
                        <span className="text-blue-600">{course.criteria}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          {/* Upcoming Courses */}
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Upcoming Courses</h2>
                <Button variant="outline" className="gap-2" onClick={() => setShowAddCourseDialog(true)}>
                  <Plus className="h-4 w-4" />
                  Add Course
                </Button>
              </div>
              <div className="space-y-4">
                {upcomingCourses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="font-medium">Course: {course.name}</div>
                        <div className="text-sm text-gray-500">Expected Commencement Date: {course.expectedDate}</div>
                      </div>
                    </div>
                    <div className="text-sm">
                      Criteria for Estab: <span className="text-blue-600">{course.criteria}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <AddCourseDialog
            open={showAddCourseDialog}
            onOpenChange={setShowAddCourseDialog}
            onAddCourse={handleAddCourse}
          />
        </main>
      </div>
    </div>
  )
}

