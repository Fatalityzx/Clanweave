"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NotificationsPopup } from "@/components/NotificationsPopup"

const notifications = [
  {
    id: 1,
    title: "New establishment request for Delta 1",
    type: "info" as const,
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Transfer request pending approval",
    type: "warning" as const,
    time: "5 hours ago",
  },
  {
    id: 3,
    title: "Successfully created new establishment",
    type: "success" as const,
    time: "1 day ago",
  },
]

export function NotificationsButton() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleNotifications = () => {
    setIsOpen((prev) => !prev)
    console.log("Notifications toggled. New state:", !isOpen)
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" className="relative" onClick={toggleNotifications}>
        <Bell className="h-5 w-5" />
        <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
        <span className="sr-only">Notifications</span>
      </Button>
      {isOpen && (
        <div className="absolute right-0 mt-2 z-50">
          <NotificationsPopup notifications={notifications} onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  )
}

