"use client"

import { CollapsibleSidebar } from "@/components/layout/collapsible-sidebar"
import { Header } from "@/components/header"
import { OrganizationTable } from "@/components/organization-table"
import { useImportedData } from "@/contexts/ImportedDataContext"
import { EmptyStateUpload } from "@/components/empty-state-upload"

export default function OrganizationTablePage() {
  const { importedData } = useImportedData()

  return (
    <div className="flex min-h-screen">
      <CollapsibleSidebar />
      <div className="flex-1">
        <Header />
        {!importedData || !importedData.positions || importedData.positions.length === 0 ? (
          <EmptyStateUpload
            title="No data available"
            description="Please upload an Excel file from the home page to view the Organization Structure."
            buttonText="Go to Home Page"
          />
        ) : (
          <main className="p-8">
            <h1 className="text-2xl font-semibold mb-6">Organization Table</h1>
            <OrganizationTable data={importedData.positions} />
          </main>
        )}
      </div>
    </div>
  )
}

