"use client"

import { useImportedData } from "@/contexts/ImportedDataContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { EstabDetailsDialog } from "@/components/EstabDetailsDialog"

export function EstabDashboard() {
  const { importedData } = useImportedData()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedPositionId, setSelectedPositionId] = useState<string | null>(null)

  const handleCardClick = (id: string) => {
    setSelectedPositionId(id)
    setIsDialogOpen(true)
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Establishment Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {importedData?.positions.map((position) => (
          <Card
            key={position.ID}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleCardClick(position.ID.toString())}
          >
            <CardHeader>
              <CardTitle>{position.Position}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>Unit: {position.Unit}</p>
              <p>Rank: {position.Rank}</p>
              <p>POSN ID: {position["POSN ID"]}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <EstabDetailsDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} positionId={selectedPositionId} />
    </div>
  )
}

