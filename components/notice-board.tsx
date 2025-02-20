import { Bell } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function NoticeBoard() {
  const notices = ["Notice for xxxx", "Request Transfer of xxxx estab", "Request of new estab creation"]

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-2">
        <Bell className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Notice and messages</h2>
      </CardHeader>
      <CardContent className="space-y-2">
        {notices.map((notice, index) => (
          <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
            {notice}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

