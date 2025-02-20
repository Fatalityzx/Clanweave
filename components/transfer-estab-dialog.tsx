"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEstab } from "@/contexts/EstabContext"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface TransferEstabDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentEstab: any
  onTransfer: (data: any) => void
}

export function TransferEstabDialog({ open, onOpenChange, currentEstab, onTransfer }: TransferEstabDialogProps) {
  const { positions } = useEstab()
  const [selectedPosition, setSelectedPosition] = useState("")
  const [approvedBy, setApprovedBy] = useState("")
  const [remarks, setRemarks] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [filteredPositions, setFilteredPositions] = useState<any[]>([])

  // Helper functions to check position types
  const isHdPosition = useCallback((title: string): boolean => {
    return title.toLowerCase().startsWith("hd") || title === "Test Transfer"
  }, [])

  const isOCPosition = useCallback((title: string): boolean => {
    return title.toLowerCase().startsWith("oc") || title === "Test Transfer"
  }, [])

  // Reset form function
  const resetForm = useCallback(() => {
    setSelectedPosition("")
    setApprovedBy("")
    setRemarks("")
    setError(null)
  }, [])

  // Filter positions based on current estab type
  useEffect(() => {
    if (!currentEstab) return

    let availablePositions = []

    if (isHdPosition(currentEstab.title)) {
      // For Hd positions, only show other Hd positions
      availablePositions = positions.filter(
        (pos) => pos.id !== currentEstab.id && isHdPosition(pos.title) && pos.title !== "Test Transfer", // Exclude Test Transfer from regular positions
      )
    } else if (isOCPosition(currentEstab.title)) {
      // For OC positions, only show other OC positions
      availablePositions = positions.filter(
        (pos) => pos.id !== currentEstab.id && isOCPosition(pos.title) && pos.title !== "Test Transfer", // Exclude Test Transfer from regular positions
      )
    } else {
      // For other positions, show all positions except current
      availablePositions = positions.filter(
        (pos) => pos.id !== currentEstab.id && pos.title !== "Test Transfer", // Exclude Test Transfer from regular positions
      )
    }

    // Add Test Transfer position exactly once
    availablePositions.push({
      id: "test-transfer",
      title: "Test Transfer",
      posnId: "TEST001",
      rank: "ME5",
    })

    setFilteredPositions(availablePositions)
  }, [currentEstab, positions, isHdPosition, isOCPosition])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate transfer rules
    if (isHdPosition(currentEstab.title) && selectedPosition !== "Test Transfer" && !isHdPosition(selectedPosition)) {
      setError("Hd positions can only be transferred to another Hd position or Test Transfer")
      return
    }

    if (isOCPosition(currentEstab.title) && selectedPosition !== "Test Transfer" && !isOCPosition(selectedPosition)) {
      setError("OC positions can only be transferred to another OC position or Test Transfer")
      return
    }

    const transferData = {
      date: new Date().toLocaleDateString(),
      previously: currentEstab.title,
      transferredTo: selectedPosition,
      approvedBy,
      remarks,
    }

    onTransfer(transferData)
    onOpenChange(false)
    resetForm()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open)
        if (!open) resetForm()
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Transfer Estab - {currentEstab?.title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="position">Transfer To</Label>
            <Select value={selectedPosition} onValueChange={setSelectedPosition} required>
              <SelectTrigger>
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                {filteredPositions.map((position) => (
                  <SelectItem key={position.id} value={position.title}>
                    {position.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              {isHdPosition(currentEstab?.title)
                ? "This Hd position can only be transferred to another Hd position or Test Transfer"
                : isOCPosition(currentEstab?.title)
                  ? "This OC position can only be transferred to another OC position or Test Transfer"
                  : "This position can be transferred to any available position"}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="approvedBy">Approved By</Label>
            <Input id="approvedBy" value={approvedBy} onChange={(e) => setApprovedBy(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks</Label>
            <Input id="remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} required />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Transfer</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

