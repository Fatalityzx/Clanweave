"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CollapsibleSidebar } from "@/components/layout/collapsible-sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { AlertCircle, LineChartIcon, Upload, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { PriorityRulesDialog } from "@/components/priority-rules-dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { useImportedData } from "@/contexts/ImportedDataContext"
import { usePriorityRules } from "@/contexts/PriorityRulesContext"
import { motion } from "framer-motion"

type ViewType = "available" | "ready"

export default function EstabDashboard() {
  const [currentView, setCurrentView] = useState<ViewType>("available")
  const [showPriorityRules, setShowPriorityRules] = useState(false)
  const [selectedReadyPositions, setSelectedReadyPositions] = useState<number[]>([])
  const router = useRouter()
  const { importedData } = useImportedData()
  const { priorityRules } = usePriorityRules()

  const positions = importedData?.positions || []

  const availablePositions = useMemo(() => positions.filter((p) => p.Section === "Available Position"), [positions])

  const readyPositions = useMemo(() => positions.filter((p) => p.Section === "Ready to Promulgate"), [positions])

  useEffect(() => {
    const handlePriorityRulesUpdate = () => {
      setCurrentView((prev) => (prev === "available" ? "ready" : "available"))
      setCurrentView((prev) => (prev === "available" ? "ready" : "available"))
    }

    window.addEventListener("priorityRulesUpdated", handlePriorityRulesUpdate)

    return () => {
      window.removeEventListener("priorityRulesUpdated", handlePriorityRulesUpdate)
    }
  }, [])

  const handleSelectAllReady = (checked: boolean) => {
    if (checked) {
      setSelectedReadyPositions(readyPositions.map((position) => position.ID))
    } else {
      setSelectedReadyPositions([])
    }
  }

  const handleSelectReadyPosition = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedReadyPositions((prev) => [...prev, id])
    } else {
      setSelectedReadyPositions((prev) => prev.filter((positionId) => positionId !== id))
    }
  }

  const getPriorityColor = (priority: string) => {
    if (priority === "On Track") return "bg-green-100 text-green-700"

    const days = Number.parseInt(priority.replace(/[^0-9]/g, ""))
    if (isNaN(days)) return "bg-gray-100 text-gray-700"

    if (days >= priorityRules.redThreshold) return "bg-red-100 text-red-700"
    if (days >= priorityRules.yellowThreshold) return "bg-yellow-100 text-yellow-700"
    return "bg-green-100 text-green-700"
  }

  if (!importedData || positions.length === 0) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <CollapsibleSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-8 flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-6 bg-white p-8 rounded-lg shadow-lg"
            >
              <Upload className="h-20 w-20 text-blue-500 mx-auto" />
              <h2 className="text-3xl font-semibold text-gray-800">No data available</h2>
              <p className="text-gray-600 max-w-md text-lg">
                Please upload an Excel file from the home page to view the Estab Dashboard.
              </p>
              <Button
                onClick={() => router.push("/")}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-lg transition-colors duration-200"
              >
                Go to Home Page
              </Button>
            </motion.div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CollapsibleSidebar />
      <div className="flex-1 overflow-hidden">
        <Header />
        <main className="p-8 space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Estab Dashboard</h1>
            <div className="text-sm text-gray-500">Snapshot data as at {new Date().toLocaleDateString()}</div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card
                className={cn(
                  "p-6 cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg",
                  currentView === "available" ? "bg-red-50 border-red-200" : "bg-white hover:bg-red-50",
                )}
                onClick={() => setCurrentView("available")}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold">Available Position</span>
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                  </div>
                </div>
                <div className="text-4xl font-bold mb-2 text-red-600">{availablePositions.length}</div>
                <div className="text-red-500 flex items-center">
                  <span className="font-medium">
                    {availablePositions.filter((p) => p.Priority === "Urgent").length} Urgently needed
                  </span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card
                className={cn(
                  "p-6 cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg",
                  currentView === "ready" ? "bg-green-50 border-green-200" : "bg-white hover:bg-green-50",
                )}
                onClick={() => setCurrentView("ready")}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold">Ready to promulgate</span>
                    <AlertCircle className="h-5 w-5 text-green-500" />
                  </div>
                </div>
                <div className="text-4xl font-bold mb-2 text-green-600">{readyPositions.length}</div>
                <div className="text-green-500 flex items-center">
                  <span className="font-medium">View details</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card
                className="p-6 bg-blue-50 cursor-pointer hover:bg-blue-100 transition-all duration-200 shadow-md hover:shadow-lg"
                onClick={() => router.push("/analysis-dashboard")}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold">View Analysis Dashboard</span>
                  <LineChartIcon className="h-6 w-6 text-blue-500" />
                </div>
                <div className="h-20 flex items-center justify-center">
                  <svg className="w-full" height="40">
                    <path d="M0,20 Q50,5 100,20 T200,20" fill="none" stroke="rgb(59, 130, 246)" strokeWidth="2" />
                  </svg>
                </div>
                <div className="text-blue-500 flex items-center mt-2">
                  <span className="font-medium">Explore analytics</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </Card>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {currentView === "available" ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold text-gray-800">Available Positions</h2>
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                  </div>
                  <Button className="bg-[#0066cc] hover:bg-[#0052a3]" onClick={() => router.push("/estab/master-list")}>
                    View List of Estabs
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold">Unit</TableHead>
                        <TableHead className="font-semibold">Position</TableHead>
                        <TableHead className="font-semibold">Vacant Since</TableHead>
                        <TableHead className="font-semibold">Rank</TableHead>
                        <TableHead className="font-semibold">Criteria</TableHead>
                        <TableHead className="font-semibold">Priority</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {availablePositions.map((position) => (
                        <TableRow key={position.ID} className="hover:bg-gray-50 transition-colors duration-150">
                          <TableCell>{position.Unit}</TableCell>
                          <TableCell>{position.Position}</TableCell>
                          <TableCell>{position["Vacant Since"]}</TableCell>
                          <TableCell>{position.Rank}</TableCell>
                          <TableCell>{position.Criteria}</TableCell>
                          <TableCell>
                            <span
                              className={cn(
                                "px-2 py-1 rounded-full text-sm font-medium",
                                position.Priority === "Urgent"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-gray-100 text-gray-700",
                              )}
                            >
                              {position.Priority}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold text-gray-800">Ready to promulgate</h2>
                    <AlertCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setShowPriorityRules(true)}>
                      Priority Rules Mgmt
                    </Button>
                    <Button
                      className="bg-[#0066cc] hover:bg-[#0052a3]"
                      onClick={() => router.push("/estab/master-list")}
                    >
                      View List of Estabs
                    </Button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="w-12">
                          <Checkbox
                            checked={selectedReadyPositions.length === readyPositions.length}
                            onCheckedChange={(checked) => handleSelectAllReady(checked as boolean)}
                          />
                        </TableHead>
                        <TableHead className="font-semibold">Position</TableHead>
                        <TableHead className="font-semibold">Rank</TableHead>
                        <TableHead className="font-semibold">Estab Ready Date</TableHead>
                        <TableHead className="font-semibold">Priority</TableHead>
                        <TableHead className="font-semibold">Remarks</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {readyPositions.map((position) => (
                        <TableRow key={position.ID} className="hover:bg-gray-50 transition-colors duration-150">
                          <TableCell>
                            <Checkbox
                              checked={selectedReadyPositions.includes(position.ID)}
                              onCheckedChange={(checked) => handleSelectReadyPosition(position.ID, checked as boolean)}
                            />
                          </TableCell>
                          <TableCell>{position.Position}</TableCell>
                          <TableCell>{position.Rank}</TableCell>
                          <TableCell>{position["Estab Ready Date"]}</TableCell>
                          <TableCell>
                            <span
                              className={cn(
                                "px-2 py-1 rounded-full text-sm font-medium",
                                getPriorityColor(position.Priority),
                              )}
                            >
                              {position.Priority}
                            </span>
                          </TableCell>
                          <TableCell>{position.Remarks}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </motion.div>
          <PriorityRulesDialog open={showPriorityRules} onOpenChange={setShowPriorityRules} />
        </main>
      </div>
    </div>
  )
}

