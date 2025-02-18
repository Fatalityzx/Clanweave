import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Pencil, FileText } from "lucide-react"

interface OrganizationTableProps {
  data: Array<{
    id: string
    position: string
    department: string
    supervisor: string
  }>
}

export function OrganizationTable({ data }: OrganizationTableProps) {
  const router = useRouter()

  const handleEditEstab = (id: string) => {
    router.push(`/estab/master-list/${id}`)
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Position</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Supervisor</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.position}</TableCell>
            <TableCell>{row.department}</TableCell>
            <TableCell>{row.supervisor}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="icon" className="h-8 w-8 mr-2" onClick={() => handleEditEstab(row.id)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <FileText className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

