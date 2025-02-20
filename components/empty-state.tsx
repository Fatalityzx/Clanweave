import { Upload } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface EmptyStateProps {
  title?: string
  description?: string
  buttonText?: string
  buttonHref?: string
}

export default function EmptyState({
  title = "No data available",
  description = "Please upload an Excel file from the home page to view the Estab Dashboard.",
  buttonText = "Go to Home Page",
  buttonHref = "/",
}: EmptyStateProps) {
  return (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="mx-auto max-w-md text-center">
        <CardContent className="pt-6">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-blue-50 p-3">
              <Upload className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <h3 className="mb-2 text-xl font-semibold">{title}</h3>
          <p className="mb-6 text-sm text-muted-foreground">{description}</p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href={buttonHref}>{buttonText}</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

