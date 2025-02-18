"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import type { OrgNode } from "./types"
import { useOrgChart } from "./org-chart-context"

interface ChartNodeProps {
  node: OrgNode
  isRoot?: boolean
}

export function ChartNode({ node, isRoot = false }: ChartNodeProps) {
  const { selectedSection, setSelectedNode } = useOrgChart()
  const nodeRef = React.useRef<HTMLDivElement>(null)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (nodeRef.current) {
      const rect = nodeRef.current.getBoundingClientRect()
      setSelectedNode({
        x: rect.right,
        y: rect.top,
        nodeId: node.id,
      })
    }
  }

  const showChildren = !selectedSection || node.section === selectedSection

  return (
    <div className="flex flex-col items-center">
      <div
        ref={nodeRef}
        className={cn(
          "relative px-6 py-3 rounded-lg cursor-pointer transition-all",
          node.section === "purple" && "bg-purple-100",
          node.section === "red" && "bg-red-100",
          node.section === "green" && "bg-green-100",
          node.isVacant && "bg-red-200",
          isRoot && "mb-8",
        )}
        onClick={handleClick}
      >
        <div className="text-sm font-medium whitespace-nowrap">{node.title}</div>
      </div>
      {showChildren && node.children && node.children.length > 0 && (
        <>
          <div className="w-px h-8 bg-gray-300" />
          <div className="relative flex gap-12">
            {node.children.map((child, index) => (
              <React.Fragment key={child.id}>
                {index > 0 && <div className="absolute top-0 h-px bg-gray-300" style={{ left: "0", right: "0" }} />}
                <ChartNode node={child} />
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

