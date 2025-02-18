"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { usePriorityRules } from "@/contexts/PriorityRulesContext"

export function PriorityRulesDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { priorityRules, updatePriorityRules } = usePriorityRules()
  const [localRules, setLocalRules] = React.useState(priorityRules)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    setLocalRules(priorityRules)
  }, [priorityRules])

  const handleThresholdChange = (field: "redThreshold" | "yellowThreshold", value: number) => {
    setLocalRules((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const validateRules = () => {
    if (localRules.yellowThreshold >= localRules.redThreshold) {
      setError("Yellow threshold must be less than red threshold")
      return false
    }
    setError(null)
    return true
  }

  const handleSave = () => {
    if (validateRules()) {
      updatePriorityRules(localRules)
      onOpenChange(false)
      // Force a re-render of the parent component
      window.dispatchEvent(new Event("priorityRulesUpdated"))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Priority Rules Management</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Priority Rules */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Priority Rules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Red Threshold */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-red-100" />
                  <Label>Red Priority Threshold</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    value={localRules.redThreshold}
                    onChange={(e) => handleThresholdChange("redThreshold", Number(e.target.value))}
                    className="w-24"
                  />
                  <span className="text-sm text-gray-500">days or more</span>
                  <AlertCircle className="h-4 w-4 text-red-500" />
                </div>
              </div>

              {/* Yellow Threshold */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-yellow-100" />
                  <Label>Yellow Priority Threshold</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    value={localRules.yellowThreshold}
                    onChange={(e) => handleThresholdChange("yellowThreshold", Number(e.target.value))}
                    className="w-24"
                  />
                  <span className="text-sm text-gray-500">days or more</span>
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                </div>
              </div>

              {/* Green Priority Note */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-green-100" />
                  <Label>Green Priority</Label>
                </div>
                <div className="text-sm text-gray-500 pl-6">
                  Applied to all items below yellow threshold or marked as "On Track"
                </div>
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

