"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Home, Building2, Shield, Key, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarItemProps {
  label: string
  icon: React.ReactNode
  href?: string
  children?: {
    href: string
    label: string
  }[]
  isActive?: boolean
}

function SidebarItem({ label, icon, href, children, isActive }: SidebarItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (!children) {
    return (
      <Link
        href={href || "/"}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-700 text-white w-full",
          isActive && "bg-blue-700",
        )}
      >
        {icon}
        {label}
      </Link>
    )
  }

  return (
    <div>
      <Button
        variant="ghost"
        className={cn("w-full justify-between text-white hover:bg-blue-700", isOpen && "bg-blue-700")}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {icon}
          {label}
        </div>
        <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen && "transform rotate-180")} />
      </Button>
      {isOpen && (
        <div className="ml-4 mt-1 space-y-1">
          {children.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-sm hover:bg-blue-700 rounded-lg text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-[#0066cc] text-white min-h-screen flex flex-col">
      <div className="p-4 border-b border-blue-500">
        <Link href="/" className="flex items-center gap-2 text-white">
          <Menu className="h-5 w-5" />
          <span className="font-semibold">CLANWEAVE</span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <SidebarItem label="Home" icon={<Home className="h-5 w-5" />} href="/" isActive={pathname === "/"} />
        <SidebarItem
          label="Organization"
          icon={<Building2 className="h-5 w-5" />}
          children={[
            { href: "/structure", label: "Structure" },
            { href: "/table", label: "Table" },
          ]}
          isActive={pathname.startsWith("/structure") || pathname.startsWith("/table")}
        />
        <SidebarItem
          label="Estab"
          icon={<Shield className="h-5 w-5" />}
          children={[
            { href: "/estab/dashboard", label: "Dashboard" },
            { href: "/estab/master-list", label: "Master Estab List" },
          ]}
          isActive={pathname.startsWith("/estab")}
        />
        <SidebarItem
          label="Access Management"
          icon={<Key className="h-5 w-5" />}
          href="/access-management"
          isActive={pathname === "/access-management"}
        />
      </nav>
    </div>
  )
}

