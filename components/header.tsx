"use client"

import React from "react"

import { Bell, ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"
import { useGlobalSearch } from "@/contexts/GlobalSearchContext"
import { useRouter } from "next/navigation"

export function Header() {
  const { setSearchQuery } = useGlobalSearch()
  const [localSearchQuery, setLocalSearchQuery] = React.useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (localSearchQuery.trim()) {
      setSearchQuery(localSearchQuery)
    }
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border-b bg-white"
    >
      <div className="flex h-16 items-center px-4 gap-4">
        <div className="text-xl font-semibold">CLANWEAVE</div>

        {/* Global Search */}
        <div className="flex-1 ml-8">
          <form onSubmit={handleSearch} className="relative max-w-md">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search positions, personnel, or units..."
              className="pl-8 w-full"
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleSearch(e)
                }
              }}
            />
          </form>
        </div>

        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
          </Button>

          {/* Admin Account */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <img src="/placeholder-user.jpg" alt="Admin" className="w-8 h-8 rounded-full" />
                  <span>Admin Account</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-600">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  )
}

