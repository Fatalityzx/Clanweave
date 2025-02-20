"use client"

import { ChartNode } from "./chart-node"
import { NodePopup } from "./node-popup"
import { useOrgChart } from "./org-chart-context"
import type { OrgNode } from "./types"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Pencil } from "lucide-react"
import { useRouter } from "next/navigation"

interface OrgChartProps {
  data: OrgNode
}

export function OrgChart({ data }: OrgChartProps) {
  const { selectedSection, setSelectedSection, zoomLevel, setZoomLevel, selectedNode, setSelectedNode } = useOrgChart()
  const router = useRouter()

  const handleSectionClick = (section: string) => {
    setSelectedSection(section)
    setZoomLevel(2)
  }

  const handleBack = () => {
    setSelectedSection(null)
    setZoomLevel(1)
  }

  const handleNodeAction = (action: "details" | "edit") => {
    if (selectedNode) {
      if (action === "details") {
        router.push(`/estab/details/${selectedNode.nodeId}`)
      }
      setSelectedNode(null)
    }
  }

  return (
    <div className="relative w-full h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {selectedSection && (
            <Button variant="ghost" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
          <div className="text-sm text-gray-500">
            Organizational Chart {selectedSection && ">"} {selectedSection && "Structure"}
          </div>
        </div>
        <Button>
          <Pencil className="h-4 w-4 mr-2" />
          Modify structure
        </Button>
      </div>

      <div
        className="relative overflow-auto border rounded-lg bg-white p-8 transition-transform duration-300"
        style={{
          transform: `scale(${zoomLevel})`,
          transformOrigin: selectedSection ? "center" : "top center",
        }}
      >
        <ChartNode node={data} isRoot />
      </div>

      {selectedNode && (
        <NodePopup
          x={selectedNode.x}
          y={selectedNode.y}
          nodeId={selectedNode.nodeId}
          onClose={() => setSelectedNode(null)}
        />
      )}

      {data.headcount && selectedSection && (
        <div className="absolute top-4 right-4 bg-white p-4 rounded-lg border shadow-sm">
          <div className="text-sm font-medium mb-2">Total headcount of ranks:</div>
          {Object.entries(data.headcount).map(([rank, count]) => (
            <div key={rank} className="text-sm">
              {rank} {count}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

