"use client"

import { Button } from "@/components/ui/button"
import { FileText, Edit } from "lucide-react"
import Link from "next/link"

interface NodePopupProps {
  x: number
  y: number
  nodeId: string
  onClose: () => void
}

export function NodePopup({ x, y, nodeId, onClose }: NodePopupProps) {
  return (
    <div
      className="absolute z-50 bg-white rounded-lg shadow-lg border p-2 space-y-2"
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
    >
      <Link href={`/estab/details/${nodeId}`} passHref>
        <Button variant="ghost" className="w-full justify-start" onClick={onClose}>
          <FileText className="mr-2 h-4 w-4" />
          Estab Details
        </Button>
      </Link>
      <Button variant="ghost" className="w-full justify-start" onClick={onClose}>
        <Edit className="mr-2 h-4 w-4" />
        Estab Edit
      </Button>
    </div>
  )
}

