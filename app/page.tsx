"use client"

import type React from "react"

import { useState } from "react"
import { Template } from "@/components/layout/template"
import { Bell, Upload, FileText, Database, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import * as XLSX from "xlsx"
import { useRouter } from "next/navigation"
import { useImportedData } from "@/contexts/ImportedDataContext"
import { motion } from "framer-motion"
import cn from "classnames"

interface Notification {
  id: number
  title: string
  type: "info" | "warning" | "success"
  time: string
}

const notifications: Notification[] = [
  { id: 1, title: "New establishment request for Delta 1", type: "info", time: "2 hours ago" },
  { id: 2, title: "Transfer request pending approval", type: "warning", time: "5 hours ago" },
  { id: 3, title: "Successfully created new establishment", type: "success", time: "1 day ago" },
]

const quickActions = [
  {
    title: "Import Excel File",
    description: "Upload your Excel file to manage establishments",
    icon: <Upload className="h-6 w-6 text-white" />,
    color: "bg-blue-500",
    gradient: "from-blue-400/20 via-blue-400/0 to-transparent",
    iconBg: "bg-gradient-to-br from-blue-400 to-blue-500",
  },
  {
    title: "Import from e-HR",
    description: "Sync data directly from e-HR system",
    icon: <Database className="h-6 w-6 text-white" />,
    color: "bg-purple-500",
    gradient: "from-purple-400/20 via-purple-400/0 to-transparent",
    iconBg: "bg-gradient-to-br from-purple-400 to-purple-500",
  },
  {
    title: "View Master List",
    description: "Access the complete establishment list",
    icon: <FileText className="h-6 w-6 text-white" />,
    color: "bg-green-500",
    gradient: "from-green-400/20 via-green-400/0 to-transparent",
    iconBg: "bg-gradient-to-br from-green-400 to-green-500",
    href: "/estab/master-list",
  },
]

export default function Home() {
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const router = useRouter()
  const { setImportedData } = useImportedData()

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification)
    setIsDialogOpen(true)
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const data = await file.arrayBuffer()
      const workbook = XLSX.read(data, { type: "array" })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const positions = XLSX.utils.sheet_to_json(worksheet)
      setImportedData({ positions })
      router.push("/estab/dashboard")
    } catch (error) {
      console.error("Error parsing Excel file:", error)
      alert("Failed to parse Excel file. Please make sure it has the correct format.")
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <Template>
      <motion.div initial="hidden" animate="show" variants={container} className="max-w-6xl mx-auto space-y-8">
        {/* Hero Section */}
        <motion.div variants={item} className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome to <span className="text-blue-600">CLANWEAVE</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your comprehensive solution for establishment management and organizational structure
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={item}>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {quickActions.map((action) => (
              <motion.div key={action.title} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card
                  className="relative overflow-hidden cursor-pointer hover:shadow-lg transition-shadow h-[220px]"
                  onClick={() => {
                    if (action.href) {
                      router.push(action.href)
                    } else if (action.title === "Import Excel File") {
                      document.getElementById("file-input")?.click()
                    } else if (action.title === "Import from e-HR") {
                      // Add e-HR import logic here
                      console.log("Importing from e-HR")
                    }
                  }}
                >
                  <div
                    className={cn(
                      "absolute top-0 right-0 w-48 h-48 bg-gradient-to-br",
                      action.gradient,
                      "transform translate-x-20 -translate-y-20 rounded-full",
                    )}
                  />
                  <CardContent className="h-full flex flex-col p-6 relative">
                    <div
                      className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center",
                        action.iconBg,
                        "relative overflow-hidden shadow-lg",
                      )}
                    >
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom_right,_white,_transparent_70%)]" />
                      {action.icon}
                    </div>
                    <div className="flex-1 flex flex-col justify-between mt-4">
                      <div>
                        <h3 className="text-lg font-semibold">{action.title}</h3>
                        <p className="text-gray-600 mt-2 line-clamp-2">{action.description}</p>
                      </div>
                      <div className="flex items-center justify-end text-sm font-medium text-blue-600 mt-4">
                        Get Started
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Bell className="h-5 w-5 text-blue-500" />
              <CardTitle>Recent Updates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  whileHover={{ x: 4 }}
                  className={cn(
                    "p-4 border rounded-lg cursor-pointer transition-colors flex items-center justify-between gap-4",
                    "hover:bg-gray-50",
                  )}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn("h-2 w-2 rounded-full", {
                        "bg-blue-500": notification.type === "info",
                        "bg-yellow-500": notification.type === "warning",
                        "bg-green-500": notification.type === "success",
                      })}
                    />
                    <div>
                      <p className="font-medium text-gray-800">{notification.title}</p>
                      <p className="text-sm text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <input type="file" accept=".xlsx,.xls" className="hidden" id="file-input" onChange={handleFileChange} />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedNotification?.title}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-gray-600">Notification details will appear here.</p>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </Template>
  )
}

