"use client"

import * as React from "react"
import { OrgChart } from "./org-chart"
import type { OrgNode } from "./types"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useOrgChart } from "./org-chart-context"

const orgChartData: OrgNode = {
  id: "1",
  title: "HQ xxxx",
  type: "hq",
  section: "purple",
  children: [
    {
      id: "2",
      title: "Hd",
      type: "branch",
      section: "red",
      children: [
        {
          id: "3",
          title: "SM",
          type: "unit",
          section: "green",
          children: [
            { id: "4", title: "PC '1A' Coy", type: "unit", section: "green", isVacant: true },
            { id: "5", title: "PC '1B' Coy", type: "unit", section: "green" },
          ],
        },
        {
          id: "6",
          title: "Delta 1A",
          type: "unit",
          section: "green",
          children: [{ id: "7", title: "PC 'xxx' Coy", type: "unit", section: "green" }],
        },
        {
          id: "8",
          title: "Delta 1B",
          type: "unit",
          section: "green",
          children: [{ id: "9", title: "PC 'xxx' Coy", type: "unit", section: "green" }],
        },
        {
          id: "10",
          title: "OC xxx",
          type: "unit",
          section: "green",
          children: [{ id: "11", title: "PC 'xxx' Coy", type: "unit", section: "green" }],
        },
      ],
      headcount: {
        ME1: "2/3",
        ME2: "0/2",
        ME3: "1/1",
        ME4: "2/3",
        ME5: "1/1",
        ME6: "1/1",
      },
    },
  ],
}

export function DetailedView({ onBack }: { onBack: () => void }) {
  const { zoomLevel, setZoomLevel } = useOrgChart()
  const [isZoomed, setIsZoomed] = React.useState(false)

  React.useEffect(() => {
    setIsZoomed(zoomLevel > 1)
  }, [zoomLevel])

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="text-sm text-gray-500">Organizational Chart > Structure</div>
      </div>
      <OrgChart data={orgChartData} />
    </div>
  )
}

