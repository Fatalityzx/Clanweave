"use client"

import { cn } from "@/lib/utils"

interface OverviewSectionProps {
  color: "purple" | "red" | "green"
  onClick: () => void
}

export function OverviewSection({ color, onClick }: OverviewSectionProps) {
  return (
    <div
      className={cn(
        "rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg relative",
        color === "purple" && "bg-purple-100/50 hover:bg-purple-100",
        color === "red" && "bg-red-100/50 hover:bg-red-100",
        color === "green" && "bg-green-100/50 hover:bg-green-100",
      )}
      onClick={onClick}
    >
      <div className="absolute top-2 left-2 bg-white/80 px-2 py-1 rounded text-xs font-semibold">
        {color === "red" ? "HQ xyz" : color === "green" ? "xxxx" : "HQ xxxx"}
      </div>
      <div
        className={cn(
          "w-full h-16 rounded-lg mb-4",
          color === "purple" && "bg-purple-200",
          color === "red" && "bg-red-200",
          color === "green" && "bg-green-200",
        )}
      />
      <div
        className={cn(
          "w-full h-16 rounded-lg",
          color === "purple" && "bg-purple-200",
          color === "red" && "bg-red-200",
          color === "green" && "bg-green-200",
        )}
      />
    </div>
  )
}

