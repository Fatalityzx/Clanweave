"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEstab } from "@/contexts/EstabContext"

interface ReprofileEstabDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentEstab: {
    id: string
    title: string
    posnId: string
    rank: string
    requirements: {
      minRank: string
      experience: string
      priority: string
      readyDate: string
    }
    remarks: string
  }
  onReprofile: (data: any) => void
}

export function ReprofileEstabDialog({ open, onOpenChange, currentEstab, onReprofile }: ReprofileEstabDialogProps) {
  const { addVersionHistory } = useEstab()
  const [formData, setFormData] = useState({
    title: currentEstab.title,
    posnId: currentEstab.posnId,
    rank: currentEstab.rank,
    minRank: currentEstab.requirements?.minRank || "",
    experience: currentEstab.requirements?.experience || "",
    priority: currentEstab.requirements?.priority || "",
    readyDate: currentEstab.requirements?.readyDate || "",
    remarks: currentEstab.remarks || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create changes array for version history
    const changes = []
    if (formData.title !== currentEstab.title) {
      changes.push({ field: "Title", from: currentEstab.title, to: formData.title })
    }
    if (formData.posnId !== currentEstab.posnId) {
      changes.push({ field: "POSN ID", from: currentEstab.posnId, to: formData.posnId })
    }
    if (formData.rank !== currentEstab.rank) {
      changes.push({ field: "Rank", from: currentEstab.rank, to: formData.rank })
    }
    if (formData.minRank !== currentEstab.requirements?.minRank) {
      changes.push({ field: "Minimum Rank", from: currentEstab.requirements?.minRank, to: formData.minRank })
    }
    if (formData.experience !== currentEstab.requirements?.experience) {
      changes.push({ field: "Experience", from: currentEstab.requirements?.experience, to: formData.experience })
    }
    if (formData.priority !== currentEstab.requirements?.priority) {
      changes.push({ field: "Priority", from: currentEstab.requirements?.priority, to: formData.priority })
    }
    if (formData.readyDate !== currentEstab.requirements?.readyDate) {
      changes.push({ field: "Ready Date", from: currentEstab.requirements?.readyDate, to: formData.readyDate })
    }
    if (formData.remarks !== currentEstab.remarks) {
      changes.push({ field: "Remarks", from: currentEstab.remarks, to: formData.remarks })
    }

    if (changes.length > 0) {
      const versionHistoryEntry = {
        date: new Date().toLocaleDateString(),
        modifiedBy: "Current User", // Replace with actual user info
        changes,
      }
      addVersionHistory(currentEstab.id, versionHistoryEntry)
    }

    onReprofile(formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Reprofile Estab - {currentEstab.title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="posnId" className="text-right">
              POSN ID
            </Label>
            <Input
              id="posnId"
              value={formData.posnId}
              onChange={(e) => setFormData({ ...formData, posnId: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rank" className="text-right">
              Rank
            </Label>
            <Select value={formData.rank} onValueChange={(value) => setFormData({ ...formData, rank: value })}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select rank" />
              </SelectTrigger>
              <SelectContent>
                {["ME1", "ME2", "ME3", "ME4", "ME5", "ME6"].map((rank) => (
                  <SelectItem key={rank} value={rank}>
                    {rank}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="minRank" className="text-right">
              Min Rank
            </Label>
            <Select value={formData.minRank} onValueChange={(value) => setFormData({ ...formData, minRank: value })}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select minimum rank" />
              </SelectTrigger>
              <SelectContent>
                {["ME1", "ME2", "ME3", "ME4", "ME5", "ME6"].map((rank) => (
                  <SelectItem key={rank} value={rank}>
                    {rank}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="experience" className="text-right">
              Experience
            </Label>
            <Input
              id="experience"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">
              Priority
            </Label>
            <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                {["Low", "Medium", "High"].map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    {priority}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="readyDate" className="text-right">
              Ready Date
            </Label>
            <Input
              id="readyDate"
              value={formData.readyDate}
              onChange={(e) => setFormData({ ...formData, readyDate: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="remarks" className="text-right">
              Remarks
            </Label>
            <Input
              id="remarks"
              value={formData.remarks}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

