"use client"

import { Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface EmptyStateUploadProps {
  title?: string
  description?: string
  buttonText?: string
}

export function EmptyStateUpload({
  title = "No data available",
  description = "Please upload an Excel file from the home page to view the data.",
  buttonText = "Go to Home Page",
}: EmptyStateUploadProps) {
  const router = useRouter()

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <div className="flex-1" /> {/* This pushes the content down */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6 bg-white p-8 rounded-lg border shadow-sm max-w-md w-full"
      >
        <Upload className="h-16 w-16 text-blue-500 mx-auto" />
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 text-lg">{description}</p>
        <Button
          onClick={() => router.push("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-base transition-colors duration-200"
        >
          {buttonText}
        </Button>
      </motion.div>
      <div className="flex-1" /> {/* This ensures vertical centering */}
    </div>
  )
}

