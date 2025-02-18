"use client"

import type React from "react"

import { Bell, ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"
import { useGlobalSearch } from "@/contexts/GlobalSearchContext"
import { useRouter } from "next/navigation"

export function Header() {
  const { searchQuery, setSearchQuery } = useGlobalSearch()
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement your search logic here
    // For now, we'll just navigate to a search results page
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-sm px-6 py-4 flex justify-between items-center"
    >
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">CLANWEAVE</h1>
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-64 rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </form>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full">
          <Bell className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 gap-2">
              Admin Account
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">Profile</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">Settings</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 text-red-600">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  )
}

