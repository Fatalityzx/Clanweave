"use client"
import { CollapsibleSidebar } from "@/components/layout/collapsible-sidebar"
import { Header } from "@/components/header"
import { OrganizationTable } from "@/components/organization-table"

// Sample data for the organization table
const organizationData = [
  { id: "1", position: "CEO", department: "Executive", supervisor: "Board of Directors" },
  { id: "2", position: "CTO", department: "Technology", supervisor: "CEO" },
  { id: "3", position: "CFO", department: "Finance", supervisor: "CEO" },
  { id: "4", position: "COO", department: "Operations", supervisor: "CEO" },
  { id: "5", position: "HR Manager", department: "Human Resources", supervisor: "COO" },
  { id: "6", position: "Senior Developer", department: "Technology", supervisor: "CTO" },
  { id: "7", position: "Marketing Manager", department: "Marketing", supervisor: "COO" },
  { id: "8", position: "Sales Manager", department: "Sales", supervisor: "COO" },
  { id: "9", position: "Product Manager", department: "Product", supervisor: "CTO" },
  { id: "10", position: "Customer Support Manager", department: "Customer Service", supervisor: "COO" },
]

export default function OrganizationTablePage() {
  return (
    <div className="flex min-h-screen">
      <CollapsibleSidebar />
      <div className="flex-1">
        <Header />
        <main className="p-8">
          <h1 className="text-2xl font-semibold mb-6">Organization Table</h1>
          <OrganizationTable data={organizationData} />
        </main>
      </div>
    </div>
  )
}

