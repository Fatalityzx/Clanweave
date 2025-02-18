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
  currentEstab: string
  onTransfer: (transferData: TransferData) => void
}

export interface TransferData {
  date: string
  previously: string
  transferredTo: string
  approvedBy: string
  remarks: string
}

const availableEstabs = ["OC 'A' Coy", "OC 'B' Coy", "OC 'C' Coy", "OC 'D' Coy", "Delta 1", "Delta 2"]

export function TransferEstabDialog({ open, onOpenChange, currentEstab, onTransfer }: TransferEstabDialogProps) {
  const [selectedEstab, setSelectedEstab] = useState<string>("")
  const [approvedBy, setApprovedBy] = useState("")
  const [remarks, setRemarks] = useState("")

  const handleConfirm = () => {
    if (selectedEstab && approvedBy) {
      const today = new Date()
      const formattedDate = today.toLocaleDateString("en-GB") // DD/MM/YYYY format

      const transferData: TransferData = {
        date: formattedDate,
        previously: currentEstab, // This will be overridden by EstabContext
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
          <DialogTitle>Transfer {currentEstab} to:</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label>Select Destination</Label>
            <Select value={selectedEstab} onValueChange={setSelectedEstab}>
              <SelectTrigger>
                <SelectValue placeholder="----Select----" />
              </SelectTrigger>
              <SelectContent>
                {availableEstabs.map((estab) => (
                  <SelectItem key={estab} value={estab}>
                    {estab}
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

