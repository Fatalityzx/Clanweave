import type React from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface OrganizationStructureProps {
  data: any[] // Replace with your actual data type
}

const OrganizationStructure: React.FC<OrganizationStructureProps> = ({ data }) => {
  if (!data?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
        <div className="rounded-full bg-blue-50 p-3 mb-4">
          <Upload className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No data available</h3>
        <p className="text-sm text-muted-foreground text-center mb-4">
          Please upload an Excel file from the home page to view the Organization Structure.
        </p>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/">Go to Home Page</Link>
        </Button>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Organization Structure Overview</h2>
      {/* Your existing organization structure visualization code */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-purple-100 p-4 rounded">Structure Item 1</div>
        <div className="bg-pink-100 p-4 rounded">Structure Item 2</div>
        <div className="bg-green-100 p-4 rounded">Structure Item 3</div>
      </div>
    </div>
  )
}

export default OrganizationStructure

