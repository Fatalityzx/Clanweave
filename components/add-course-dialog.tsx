"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface AddCourseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddCourse: (course: { name: string; expectedDate: string; criteria: string; rank: string }) => void
}

const availableCourses = [
  { name: "X1", criteria: "System Specialist", rank: "ME1" },
  { name: "X2", criteria: "PC", rank: "ME1" },
  { name: "X3", criteria: "System Analyst", rank: "ME2" },
  { name: "X4", criteria: "Software Developer", rank: "ME2" },
  { name: "X5", criteria: "Project Manager", rank: "ME3" },
  { name: "X6", criteria: "Senior HR Specialist", rank: "ME3" },
  { name: "X7", criteria: "OC 'C' Coy", rank: "ME4" },
  { name: "X8", criteria: "Dy Hd", rank: "ME4" },
  { name: "X9", criteria: "Hd Ops", rank: "ME4" },
]

export function AddCourseDialog({ open, onOpenChange, onAddCourse }: AddCourseDialogProps) {
  const [selectedCourse, setSelectedCourse] = useState("")
  const [expectedDate, setExpectedDate] = useState("")

  const handleSubmit = () => {
    if (selectedCourse && expectedDate) {
      const course = availableCourses.find((c) => c.name === selectedCourse)
      if (course) {
        onAddCourse({
          name: course.name,
          expectedDate: formatDate(expectedDate),
          criteria: course.criteria,
          rank: course.rank,
        })
        onOpenChange(false)
        setSelectedCourse("")
        setExpectedDate("")
      }
    }
  }

  const formatDate = (date: string) => {
    const [year, month, day] = date.split("-")
    return `${day}/${month}/${year}`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Course</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="course">Select Course</Label>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger>
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {availableCourses.map((course) => (
                  <SelectItem key={course.name} value={course.name}>
                    {course.name} (Rank: {course.rank}, Estab: {course.criteria})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Expected Commencement Date</Label>
            <input
              type="date"
              id="date"
              value={expectedDate}
              onChange={(e) => setExpectedDate(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!selectedCourse || !expectedDate}>
            Add Course
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

