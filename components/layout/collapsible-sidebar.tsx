"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Home, Building2, Shield, Key, Menu, LayoutDashboard, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface SidebarItemProps {
  label: string
  icon: React.ReactNode
  href?: string
  children?: {
    href: string
    label: string
    icon: React.ReactNode
  }[]
  isActive?: boolean
  isCollapsed: boolean
}

function SidebarItem({ label, icon, href, children, isActive, isCollapsed }: SidebarItemProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(() => {
    return children?.some((child) => pathname.startsWith(child.href))
  })
  const [isHovered, setIsHovered] = React.useState(false)
  const timeoutRef = React.useRef<NodeJS.Timeout>()

  React.useEffect(() => {
    if (children?.some((child) => pathname.startsWith(child.href))) {
      setIsOpen(true)
    }
  }, [pathname, children])

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleMouseEnter = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsHovered(true)
  }, [])

  const handleMouseLeave = React.useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false)
    }, 100)
  }, [])

  if (!children) {
    return (
      <Link
        href={href || "/"}
        className={cn(
          "flex h-10 items-center rounded-lg px-3 text-sm font-medium transition-colors",
          isActive ? "bg-[#2563EB] text-white" : "text-gray-200 hover:bg-[#2563EB]/80 hover:text-white",
        )}
      >
        <div className="flex items-center gap-2 min-w-0 w-full">
          {icon}
          {!isCollapsed && <span className="truncate">{label}</span>}
        </div>
      </Link>
    )
  }

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Button
        variant="ghost"
        className={cn(
          "w-full h-10 flex items-center justify-start px-3 text-sm font-medium transition-colors",
          isCollapsed ? "justify-start" : "justify-between",
          children
            ? "bg-[#4F46E5] text-white hover:bg-[#4F46E5]/90"
            : pathname.startsWith(href || "") || isOpen
              ? "bg-[#2563EB] text-white"
              : "text-gray-200 hover:bg-[#2563EB]/80 hover:text-white",
        )}
        onClick={() => {
          if (!isCollapsed) {
            setIsOpen(!isOpen)
          }
        }}
      >
        <div className="flex items-center gap-2 min-w-0">
          {icon}
          {!isCollapsed && <span className="truncate">{label}</span>}
        </div>
        {!isCollapsed && (
          <ChevronDown className={cn("h-4 w-4 flex-shrink-0 transition-transform", isOpen && "rotate-180")} />
        )}
      </Button>
      {((isOpen && !isCollapsed) || (isCollapsed && isHovered)) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "space-y-1",
            isCollapsed ? "absolute left-full top-0 min-w-[160px] rounded-lg bg-[#4F46E5] p-2 ml-2 z-50" : "ml-4 mt-1",
          )}
        >
          {children.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center rounded-lg text-sm font-medium text-gray-200 hover:bg-[#2563EB] hover:text-white px-3 h-9 transition-colors",
                pathname === item.href && "bg-[#2563EB] text-white",
              )}
            >
              <div className="flex items-center gap-2 min-w-0">
                {item.icon}
                <span className="truncate">{item.label}</span>
              </div>
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export function CollapsibleSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  return (
    <motion.aside
      initial={{ width: 256 }}
      animate={{ width: isCollapsed ? 64 : 256 }}
      transition={{ duration: 0.3 }}
      className={cn("bg-[#1E3A8A] text-white min-h-screen flex flex-col transition-all duration-300 ease-in-out")}
    >
      <div className="border-b border-[#2563EB] h-14 flex items-center px-4">
        <Button
          variant="ghost"
          className="text-white w-full flex items-center h-10 px-3"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <div className="flex items-center gap-2 min-w-0 w-full">
            <Menu className="h-5 w-5" />
            {!isCollapsed && <span className="truncate font-semibold">CLANWEAVE</span>}
          </div>
        </Button>
      </div>
      <nav className="flex-1 py-4 px-2 space-y-1">
        <SidebarItem
          label="Home"
          icon={<Home className="h-5 w-5" />}
          href="/"
          isActive={pathname === "/"}
          isCollapsed={isCollapsed}
        />
        <SidebarItem
          label="Organization"
          icon={<Building2 className="h-5 w-5" />}
          children={[
            { href: "/structure", label: "Structure", icon: <LayoutDashboard className="h-4 w-4" /> },
            { href: "/table", label: "Table", icon: <FileText className="h-4 w-4" /> },
          ]}
          isActive={pathname.startsWith("/structure") || pathname.startsWith("/table")}
          isCollapsed={isCollapsed}
        />
        <SidebarItem
          label="Estab"
          icon={<Shield className="h-5 w-5" />}
          children={[
            { href: "/estab/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
            { href: "/estab/master-list", label: "Master Estab List", icon: <FileText className="h-4 w-4" /> },
          ]}
          isActive={pathname.startsWith("/estab")}
          isCollapsed={isCollapsed}
        />
        <SidebarItem
          label="Access Management"
          icon={<Key className="h-5 w-5" />}
          href="/access-management"
          isActive={pathname === "/access-management"}
          isCollapsed={isCollapsed}
        />
      </nav>
    </motion.aside>
  )
}

