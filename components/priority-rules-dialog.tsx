"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { InfoIcon as InfoCircle, ChevronUp, ChevronDown } from "lucide-react"
import { usePriorityRules } from "@/contexts/PriorityRulesContext"

interface PriorityRulesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PriorityRulesDialog({ open, onOpenChange }: PriorityRulesDialogProps) {
  const { priorityRules, updatePriorityRules } = usePriorityRules()
  const [yellowThreshold, setYellowThreshold] = useState(priorityRules.yellowThreshold.toString())
  const [redThreshold, setRedThreshold] = useState(priorityRules.redThreshold.toString())

  const handleIncrement = (setter: (value: string) => void, currentValue: string) => {
    const numValue = Number.parseInt(currentValue, 10)
    if (!isNaN(numValue)) {
      setter((numValue + 1).toString())
    }
  }

  const handleDecrement = (setter: (value: string) => void, currentValue: string) => {
    const numValue = Number.parseInt(currentValue, 10)
    if (!isNaN(numValue) && numValue > 0) {
      setter((numValue - 1).toString())
    }
  }

  const handleSave = () => {
    const yellow = Number.parseInt(yellowThreshold, 10)
    const red = Number.parseInt(redThreshold, 10)

    if (isNaN(yellow) || isNaN(red) || yellow >= red) {
      alert("Please enter valid numbers. Red threshold should be greater than yellow threshold.")
      return
    }

    updatePriorityRules({ yellowThreshold: yellow, redThreshold: red })
    onOpenChange(false)
    window.dispatchEvent(new Event("priorityRulesUpdated"))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800 antialiased">Priority Rules Management</DialogTitle>
        </DialogHeader>
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 antialiased">Priority Rules</h3>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="font-semibold text-gray-700 antialiased">Red Priority Threshold</span>
            </div>
            <div className="flex items-center gap-2 ml-5">
              <div className="relative">
                <Input
                  type="text"
                  value={redThreshold}
                  onChange={(e) => setRedThreshold(e.target.value)}
                  className="w-24 pr-8 text-center antialiased"
                />
                <div className="absolute right-1 top-1 bottom-1 flex flex-col">
                  <button
                    type="button"
                    onClick={() => handleIncrement(setRedThreshold, redThreshold)}
                    className="flex-1 px-1 hover:bg-gray-100 rounded-sm transition-colors"
                  >
                    <ChevronUp className="h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDecrement(setRedThreshold, redThreshold)}
                    className="flex-1 px-1 hover:bg-gray-100 rounded-sm transition-colors"
                  >
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <span className="text-gray-600 antialiased">days or more</span>
              <InfoCircle className="h-4 w-4 text-gray-400 cursor-help" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="font-semibold text-gray-700 antialiased">Yellow Priority Threshold</span>
            </div>
            <div className="flex items-center gap-2 ml-5">
              <div className="relative">
                <Input
                  type="text"
                  value={yellowThreshold}
                  onChange={(e) => setYellowThreshold(e.target.value)}
                  className="w-24 pr-8 text-center antialiased"
                />
                <div className="absolute right-1 top-1 bottom-1 flex flex-col">
                  <button
                    type="button"
                    onClick={() => handleIncrement(setYellowThreshold, yellowThreshold)}
                    className="flex-1 px-1 hover:bg-gray-100 rounded-sm transition-colors"
                  >
                    <ChevronUp className="h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDecrement(setYellowThreshold, yellowThreshold)}
                    className="flex-1 px-1 hover:bg-gray-100 rounded-sm transition-colors"
                  >
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <span className="text-gray-600 antialiased">days or more</span>
              <InfoCircle className="h-4 w-4 text-gray-400 cursor-help" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="font-semibold text-gray-700 antialiased">Green Priority</span>
            </div>
            <p className="text-gray-600 text-sm ml-5 antialiased">
              Applied to all items below yellow threshold or marked as "On Track"
            </p>
          </div>
        </div>

        <DialogFooter className="mt-8">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="mr-2 hover:bg-gray-100 transition-colors antialiased"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white transition-colors antialiased"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

