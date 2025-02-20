"use client"

import * as React from "react"
import { FileText, Edit, ArrowLeft, Wrench, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence, useDragControls, useMotionValue } from "framer-motion"

interface DetailedViewProps {
  onBack: () => void
}

export function DetailedView({ onBack }: DetailedViewProps) {
  const router = useRouter()
  const [selectedNode, setSelectedNode] = React.useState<{ id: string; x: number; y: number } | null>(null)
  const [zoomLevel, setZoomLevel] = React.useState(1)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const dragControls = useDragControls()
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handleNodeClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    if (id === "HQ xxxx") return
    const rect = e.currentTarget.getBoundingClientRect()
    setSelectedNode({ id, x: rect.right, y: rect.top })
  }

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => {
      const newZoom = Math.min(Math.max(0.5, prev + delta), 2)
      return newZoom
    })
  }

  const resetView = () => {
    setZoomLevel(1)
    x.set(0)
    y.set(0)
  }

  const constrainPan = React.useCallback(() => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const chartWidth = containerRect.width * zoomLevel
      const chartHeight = containerRect.height * zoomLevel
      const maxX = Math.max(0, (chartWidth - containerRect.width) / 2)
      const maxY = Math.max(0, (chartHeight - containerRect.height) / 2)

      x.set(Math.max(-maxX, Math.min(maxX, x.get())))
      y.set(Math.max(-maxY, Math.min(maxY, y.get())))
    }
  }, [zoomLevel, x, y])

  React.useEffect(() => {
    constrainPan()
  }, [constrainPan])

  const Node = ({
    title,
    isVacant = false,
    className = "",
    id,
  }: {
    title: string
    isVacant?: boolean
    className?: string
    id: string
  }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`
      relative w-[180px] h-[60px] rounded-lg cursor-pointer transition-all duration-200
      backdrop-blur-sm shadow-lg flex items-center justify-center
      ${
        isVacant
          ? "bg-white border-[2.5px] border-red-500 bg-gradient-to-br from-red-50/90 to-red-100/90"
          : "bg-white border-[2.5px] border-blue-500 bg-gradient-to-br from-blue-50/90 to-blue-100/90"
      }
      hover:shadow-xl hover:bg-white
      ${className}
    `}
      onClick={(e) => handleNodeClick(e, id)}
    >
      <div className={`text-sm font-medium text-center ${isVacant ? "text-red-700" : "text-blue-700"}`}>{title}</div>
    </motion.div>
  )

  const VerticalLine = ({ height = "5rem", className = "" }: { height?: string; className?: string }) => (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height }}
      transition={{ duration: 0.5 }}
      className={`w-[1.5px] bg-gray-400 mx-auto ${className}`}
    />
  )

  const handleEditEstab = (id: string) => {
    router.push(`/estab/master-list/${id}`)
  }

  return (
    <div className="relative min-h-screen bg-[rgba(233,213,255,0.3)]" onClick={() => setSelectedNode(null)}>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="gap-2 text-gray-700 hover:text-gray-900 hover:bg-white/50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <span className="text-sm text-gray-700">HQ xxxx</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleZoom(-0.1)}
              disabled={zoomLevel <= 0.5}
              className="bg-white text-gray-700 border-gray-200 hover:bg-white"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleZoom(0.1)}
              disabled={zoomLevel >= 2}
              className="bg-white text-gray-700 border-gray-200 hover:bg-white"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={resetView}
              className="bg-white text-gray-700 border-gray-200 hover:bg-white"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button className="bg-white text-purple-700 hover:bg-white/90 border border-purple-100">
              <Wrench className="h-4 w-4 mr-2" />
              Modify structure
            </Button>
          </div>
        </div>

        <div className="relative border border-white/50 rounded-xl bg-white/10 backdrop-blur-sm p-12 shadow-sm overflow-hidden">
          <div
            ref={containerRef}
            className="relative max-w-[1200px] mx-auto h-[600px] overflow-hidden cursor-grab active:cursor-grabbing"
          >
            <motion.div
              className="relative w-full h-full origin-center"
              style={{ x, y, scale: zoomLevel }}
              drag
              dragControls={dragControls}
              dragMomentum={false}
              dragElastic={0}
              onDragEnd={constrainPan}
            >
              {/* HQ xxxx */}
              <div className="absolute left-1/2 -translate-x-1/2 top-12">
                <Node title="HQ xxxx" id="HQ xxxx" className="border-blue-600 font-semibold" />
                <VerticalLine height="3rem" />
              </div>

              {/* Hd */}
              <div className="absolute left-1/2 -translate-x-1/2 top-[160px]">
                <Node title="Hd xxxx" id="Hd xxxx" />
                <VerticalLine height="3rem" />
              </div>

              {/* SM and connections */}
              <div className="absolute left-[20%] top-[240px]">
                <Node title="SM" id="SM" />
              </div>

              {/* SM connection line */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "calc(30% - 180px)" }}
                transition={{ duration: 0.5 }}
                className="absolute bg-gray-400"
                style={{
                  left: "calc(20% + 180px)",
                  top: "270px",
                  height: "1.5px",
                }}
              />

              {/* Vertical connection from SM to Delta level */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "50px" }}
                transition={{ duration: 0.5 }}
                className="absolute bg-gray-400"
                style={{
                  left: "calc(50% - 0.75px)",
                  top: "270px",
                  width: "1.5px",
                }}
              />

              {/* Delta and PC levels */}
              <div className="absolute top-[320px] w-full">
                {/* Delta level horizontal line */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "60%" }}
                  transition={{ duration: 0.5 }}
                  className="absolute h-[1.5px] bg-gray-400"
                  style={{
                    left: "20%",
                    top: "30px",
                  }}
                />

                {/* Delta 1A and PC '1A' Coy */}
                <div className="absolute left-[20%] -translate-x-1/2">
                  <Node title="Delta 1A" id="Delta 1A" />
                  <VerticalLine height="3rem" />
                  <Node title="PC '1A' Coy (Vacant)" isVacant id="PC '1A' Coy" />
                </div>

                {/* Delta 1B and PC '1B' Coy */}
                <div className="absolute left-1/2 -translate-x-1/2">
                  <Node title="Delta 1B" id="Delta 1B" />
                  <VerticalLine height="3rem" />
                  <Node title="PC '1B' Coy" id="PC '1B' Coy" />
                </div>

                {/* OC xxx and PC 'xxx' Coy */}
                <div className="absolute right-[20%] translate-x-1/2">
                  <Node title="OC xxx" id="OC xxx" />
                  <VerticalLine height="3rem" />
                  <Node title="PC 'xxx' Coy" id="PC 'xxx' Coy" />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg border shadow-sm"
          >
            <div className="text-sm font-medium mb-2 text-gray-800">Total headcount of ranks:</div>
            <div className="space-y-1.5 text-sm text-gray-600">
              {["ME1 2/3", "ME2 0/2", "ME3 1/1", "ME4 2/3", "ME5 1/1", "ME6 1/1"].map((rank) => (
                <div key={rank} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  {rank}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed z-50 bg-white rounded-lg shadow-sm border p-2 min-w-[150px]"
            style={{
              left: `${selectedNode.x}px`,
              top: `${selectedNode.y}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              className="w-full justify-start text-sm hover:bg-gray-50 text-gray-700"
              onClick={() => {
                router.push(`/organization/estab/${selectedNode.id}`)
                setSelectedNode(null)
              }}
            >
              <FileText className="h-4 w-4 mr-2" />
              Estab Details
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-sm hover:bg-gray-50 text-gray-700"
              onClick={() => {
                handleEditEstab(selectedNode.id)
                setSelectedNode(null)
              }}
            >
              <Edit className="h-4 w-4 mr-2" />
              Estab Edit
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

