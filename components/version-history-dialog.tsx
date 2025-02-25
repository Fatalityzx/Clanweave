"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface VersionHistoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  versionHistory: {
    date: string
    modifiedBy: string
    changes: {
      field: string
      from: string
      to: string
    }[]
  }[]
}

export function VersionHistoryDialog({ open, onOpenChange, versionHistory }: VersionHistoryDialogProps) {
  // Create a new array and sort it by date in descending order
  const sortedHistory = [...versionHistory].sort((a, b) => {
    // Convert DD/MM/YYYY to Date objects for comparison
    const [dayA, monthA, yearA] = a.date.split("/")
    const [dayB, monthB, yearB] = b.date.split("/")
    const dateA = new Date(Number.parseInt(yearA), Number.parseInt(monthA) - 1, Number.parseInt(dayA))
    const dateB = new Date(Number.parseInt(yearB), Number.parseInt(monthB) - 1, Number.parseInt(dayB))
    return dateB.getTime() - dateA.getTime() // Most recent first
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Version History</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Modified By</TableHead>
                <TableHead>Field</TableHead>
                <TableHead>Previous Value</TableHead>
                <TableHead>New Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedHistory.map((version, idx) =>
                version.changes.map((change, changeIdx) => (
                  <TableRow key={`${idx}-${changeIdx}`}>
                    {changeIdx === 0 && (
                      <>
                        <TableCell rowSpan={version.changes.length}>{version.date}</TableCell>
                        <TableCell rowSpan={version.changes.length}>{version.modifiedBy}</TableCell>
                      </>
                    )}
                    <TableCell>{change.field}</TableCell>
                    <TableCell>{change.from}</TableCell>
                    <TableCell>{change.to}</TableCell>
                  </TableRow>
                )),
              )}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
}

