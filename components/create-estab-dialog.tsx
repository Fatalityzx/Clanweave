"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEstab } from "@/contexts/EstabContext"

interface CreateEstabDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateEstabDialog({ open, onOpenChange }: CreateEstabDialogProps) {
  const { addNewEstab } = useEstab()
  const [title, setTitle] = useState("")
  const [posnId, setPosnId] = useState("")
  const [estabRank, setEstabRank] = useState("")
  const [approvedBy, setApprovedBy] = useState("")
  const [remarks, setRemarks] = useState("")

  const handleCreate = () => {
    if (title && posnId && estabRank && approvedBy) {
      const today = new Date()
      const formattedDate = today.toLocaleDateString("en-GB") // DD/MM/YYYY format

      const newEstab = {
        id: Date.now(), // Use timestamp as temporary ID
        title,
        posnId,
        estabRank,
        creationDate: formattedDate,
        remarks,
        lastTransfer: {
          date: formattedDate,
          previously: "NA",
          transferredTo: title,
          approvedBy,
          remarks,
        },
      }

      addNewEstab(newEstab)
      onOpenChange(false)
      resetForm()
    }
  }

  const resetForm = () => {
    setTitle("")
    setPosnId("")
    setEstabRank("")
    setApprovedBy("")
    setRemarks("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Estab</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="posnId" className="text-right">
              POSN ID
            </Label>
            <Input id="posnId" value={posnId} onChange={(e) => setPosnId(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="estabRank" className="text-right">
              Estab Rank
            </Label>
            <Select value={estabRank} onValueChange={setEstabRank}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select rank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ME1">ME1</SelectItem>
                <SelectItem value="ME2">ME2</SelectItem>
                <SelectItem value="ME3">ME3</SelectItem>
                <SelectItem value="ME4">ME4</SelectItem>
                <SelectItem value="ME5">ME5</SelectItem>
                <SelectItem value="ME6">ME6</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="approvedBy" className="text-right">
              Approved By
            </Label>
            <Input
              id="approvedBy"
              value={approvedBy}
              onChange={(e) => setApprovedBy(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="remarks" className="text-right">
              Remarks
            </Label>
            <Textarea
              id="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={!title || !posnId || !estabRank || !approvedBy}>
            Create Estab
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

