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
              {versionHistory.map((version, idx) =>
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

