"use client"

import type React from "react"

import { useState } from "react"
import { CollapsibleSidebar } from "@/components/layout/collapsible-sidebar"
import { Header } from "@/components/header"
import { OverviewSection } from "@/components/org-chart/overview-section"
import { DetailedView } from "@/components/org-chart/detailed-view"
import { useRouter } from "next/navigation"
import { FileText, Upload } from "lucide-react"
import { useImportedData } from "@/contexts/ImportedDataContext"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function StructurePage() {
  const [showDetailed, setShowDetailed] = useState(false)
  const [selectedNode, setSelectedNode] = useState(null)
  const [selectedPositionId, setSelectedPositionId] = useState("")
  const router = useRouter()
  const { importedData } = useImportedData()

  const handleNodeClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    const rect = e.currentTarget.getBoundingClientRect()
    setSelectedNode({ id, x: rect.right, y: rect.top })
    setSelectedPositionId(id)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <CollapsibleSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 p-8 overflow-auto">
          {!importedData || !importedData.positions || importedData.positions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-6 bg-white p-8 rounded-lg shadow-lg"
              >
                <Upload className="h-20 w-20 text-blue-500 mx-auto" />
                <h2 className="text-3xl font-semibold text-gray-800">No data available</h2>
                <p className="text-gray-600 max-w-md text-lg">
                  Please upload an Excel file from the home page to view the Organization Structure.
                </p>
                <Button
                  onClick={() => router.push("/")}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-lg transition-colors duration-200"
                >
                  Go to Home Page
                </Button>
              </motion.div>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <div className="text-sm text-gray-500">Organizational Chart {showDetailed && "> Structure"}</div>
              </div>

              {!showDetailed ? (
                <div className="border rounded-lg bg-blue-50 p-6">
                  <h2 className="text-lg font-medium mb-4">Organization Structure Overview</h2>
                  <div className="grid grid-cols-3 gap-6">
                    <OverviewSection color="purple" onClick={() => setShowDetailed(true)} />
                    <OverviewSection color="red" onClick={() => console.log("Red section clicked")} />
                    <OverviewSection color="green" onClick={() => console.log("Green section clicked")} />
                  </div>
                </div>
              ) : (
                <DetailedView onBack={() => setShowDetailed(false)} />
              )}
            </>
          )}
        </main>
      </div>
      {selectedNode && (
        <div className="fixed top-0 right-0 z-50 bg-white border rounded-lg shadow-lg w-64">
          <div className="p-4">
            <p className="text-sm text-gray-600">Selected Node: {selectedNode.id}</p>
            <button
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 rounded flex items-center gap-2 mt-4"
              onClick={() => {
                router.push(`/organization/estab/${selectedNode.id}`)
                setSelectedNode(null)
              }}
            >
              <FileText className="h-4 w-4" />
              Estab Details
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

