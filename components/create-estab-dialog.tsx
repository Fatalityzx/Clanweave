"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RankSelect } from "@/components/RankSelect"
import { useEstab } from "@/contexts/EstabContext"
import { useRouter } from "next/navigation"

interface CreateEstabDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateEstabDialog({ open, onOpenChange }: CreateEstabDialogProps) {
  const { addNewEstab } = useEstab()
  const router = useRouter()
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
        id: Date.now().toString(), // Use timestamp as string ID
        title,
        posnId,
        rank: estabRank,
        creationDate: formattedDate,
        remarks,
        personnel: "Vacant",
        unit: "New Unit", // You may want to add a field for this in the form
        requirements: {
          minRank: estabRank,
          experience: "Not specified",
          priority: "Medium",
          readyDate: formattedDate,
        },
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
      router.refresh() // Refresh the page to show the new estab
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
            <RankSelect value={estabRank} onValueChange={setEstabRank} />
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
          <Button
            onClick={() => {
              handleCreate()
              onOpenChange(false)
              // Dispatch a custom event to notify that a new estab has been created
              window.dispatchEvent(new CustomEvent("estabCreated"))
            }}
            disabled={!title || !posnId || !estabRank || !approvedBy}
          >
            Create Estab
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

