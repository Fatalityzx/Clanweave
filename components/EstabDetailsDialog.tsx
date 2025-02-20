import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { useImportedData } from "@/contexts/ImportedDataContext"

interface EstabDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  positionId: string | null
}

interface TransferHistory {
  date: string
  previously: string
  transferredTo: string
  approvedBy: string
  remarks: string
}

const transferHistory: TransferHistory[] = [
  {
    date: "14/1/2024",
    previously: "OC 'C' Coy",
    transferredTo: "OC xxx",
    approvedBy: "ME5 xxx",
    remarks: "Info 1, 2, 3",
  },
  {
    date: "04/10/2022",
    previously: "OC 'N' Coy",
    transferredTo: "OC 'C' Coy",
    approvedBy: "ME5 xxx",
    remarks: "Info 1, 2, 3",
  },
  {
    date: "20/12/2020",
    previously: "xx",
    transferredTo: "xx",
    approvedBy: "xx",
    remarks: "Info 1, 2, 3",
  },
  {
    date: "17/08/2019",
    previously: "xx",
    transferredTo: "xx",
    approvedBy: "xx",
    remarks: "xx",
  },
  {
    date: "30/01/2018",
    previously: "xx",
    transferredTo: "xx",
    approvedBy: "xx",
    remarks: "xx",
  },
]

export function EstabDetailsDialog({ open, onOpenChange, positionId }: EstabDetailsDialogProps) {
  const { importedData } = useImportedData()

  const position = importedData?.positions.find((p) => p.ID.toString() === positionId)

  if (!position) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            Estab Details of {position.Position} (ID: {position.ID})
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-semibold">POSN ID:</span> {position["POSN ID"]}
            </div>
            <div>
              <span className="font-semibold">Estab Creation Date:</span> {position["Creation Date"]}
            </div>
            <div>
              <span className="font-semibold">Estab Requirements:</span>{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                Link to Estab Requirement Page
              </Link>
            </div>
            <div>
              <span className="font-semibold">Other Details:</span> {position.Remarks || "N/A"}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button>Re-Profiling</Button>
            <Button>Transfer Estab</Button>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Previously</TableHead>
                  <TableHead>Transferred to</TableHead>
                  <TableHead>Approved by</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transferHistory.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.previously}</TableCell>
                    <TableCell>{record.transferredTo}</TableCell>
                    <TableCell>{record.approvedBy}</TableCell>
                    <TableCell>{record.remarks}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

