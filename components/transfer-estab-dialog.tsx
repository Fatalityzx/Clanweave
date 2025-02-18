"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TransferEstabDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentEstab: { title: string; rank: string; posnId: string }
  onTransfer: (transferData: TransferData) => void
}

export interface TransferData {
  date: string
  previously: string
  transferredTo: string
  approvedBy: string
  remarks: string
}

const availableEstabs = [
  { title: "CEO xxx", rank: "ME6", posnId: "CEO002" },
  { title: "COO xxx", rank: "ME6", posnId: "COO002" },
  { title: "Delta 1A", rank: "ME4", posnId: "ENG556" },
  { title: "Delta 1B", rank: "ME4", posnId: "ENG557" },
  { title: "OC xxx", rank: "ME4", posnId: "ENG558" },
  // ... add more estabs as needed
]

export function TransferEstabDialog({ open, onOpenChange, currentEstab, onTransfer }: TransferEstabDialogProps) {
  const [selectedEstab, setSelectedEstab] = useState<string>("")
  const [approvedBy, setApprovedBy] = useState("")
  const [remarks, setRemarks] = useState("")

  const eligibleEstabs = availableEstabs.filter(
    (estab) => estab.rank === currentEstab.rank && estab.title !== currentEstab.title,
  )

  const handleConfirm = () => {
    if (selectedEstab && approvedBy) {
      const today = new Date()
      const formattedDate = today.toLocaleDateString("en-GB") // DD/MM/YYYY format

      const transferData: TransferData = {
        date: formattedDate,
        previously: currentEstab.title, // This will be overridden by EstabContext
        transferredTo: selectedEstab,
        approvedBy,
        remarks,
      }

      onTransfer(transferData)
      onOpenChange(false)

      // Reset form
      setSelectedEstab("")
      setApprovedBy("")
      setRemarks("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Transfer {currentEstab.title} to:</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label>Select Destination</Label>
            <Select value={selectedEstab} onValueChange={setSelectedEstab}>
              <SelectTrigger>
                <SelectValue placeholder="----Select----" />
              </SelectTrigger>
              <SelectContent>
                {eligibleEstabs.map((estab) => (
                  <SelectItem key={estab.posnId} value={estab.title}>
                    {estab.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Approved By</Label>
            <Input
              placeholder="Enter approver name"
              value={approvedBy}
              onChange={(e) => setApprovedBy(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Remarks</Label>
            <Textarea
              placeholder="Enter remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!selectedEstab || !approvedBy}
              className="bg-[#0066cc] hover:bg-[#0052a3]"
            >
              Confirm
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

