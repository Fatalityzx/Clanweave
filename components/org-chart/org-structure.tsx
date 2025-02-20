import type React from "react"
import { Upload } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface OrgStructureProps {
  data: any[] // Replace 'any' with the actual type of your data
}

const OrgStructure: React.FC<OrgStructureProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg border p-8">
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
      {/* Existing structure visualization code goes here */}
      {/* Replace this with your actual visualization component */}
      <p>Organization Structure Visualization</p>
      {/* Example: Displaying the data */}
      <ul>
        {data.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  )
}

export default OrgStructure

