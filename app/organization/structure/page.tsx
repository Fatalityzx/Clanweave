"use client"

import type React from "react"

import { useState } from "react"
import { CollapsibleSidebar } from "@/components/layout/collapsible-sidebar"
import { Header } from "@/components/header"
import { OverviewSection } from "@/components/org-chart/overview-section"
import { DetailedView } from "@/components/org-chart/detailed-view"
import { useRouter } from "next/navigation"
import { FileText } from "lucide-react"

export default function StructurePage() {
  const [showDetailed, setShowDetailed] = useState(true)
  const [selectedNode, setSelectedNode] = useState(null)
  const [selectedPositionId, setSelectedPositionId] = useState("")
  const router = useRouter()

  const handleNodeClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    const rect = e.currentTarget.getBoundingClientRect()
    setSelectedNode({ id, x: rect.right, y: rect.top })
    setSelectedPositionId(id)
  }

  return (
    <div className="flex min-h-screen">
      <CollapsibleSidebar />
      <div className="flex-1">
        <Header />
        <main className="p-8">
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
        </main>
      </div>
    </div>
  )
}

