"use client"

import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface Notification {
  id: number
  title: string
  type: "info" | "warning" | "success"
  time: string
}

interface NotificationsPopupProps {
  notifications: Notification[]
  onClose: () => void
}

export function NotificationsPopup({ notifications, onClose }: NotificationsPopupProps) {
  const router = useRouter()

  const handleNotificationClick = (notification: Notification) => {
    onClose()
    switch (notification.type) {
      case "info":
        router.push("/estab/dashboard")
        break
      case "warning":
        router.push("/access-management")
        break
      case "success":
        router.push("/estab/master-list")
        break
      default:
        router.push("/")
    }
  }

  return (
    <div className="w-[400px] bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <span className="text-blue-500">🔔</span>
          Recent Updates
        </h3>
      </div>
      <div className="divide-y">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => handleNotificationClick(notification)}
            className="p-4 hover:bg-gray-50 cursor-pointer transition-colors flex items-center gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <div
                  className={cn("h-2 w-2 rounded-full flex-shrink-0", {
                    "bg-blue-500": notification.type === "info",
                    "bg-yellow-500": notification.type === "warning",
                    "bg-green-500": notification.type === "success",
                  })}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{notification.title}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  )
}

