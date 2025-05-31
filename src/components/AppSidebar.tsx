import {
  LayoutDashboard,
  Camera,
  BarChart3,
  Settings,
  Bell,
  HelpCircle,
  User,
  Logout,
} from "lucide-react"
import { NavLink } from "react-router-dom"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SidebarClose, SidebarOpen } from "@/components/ui/sidebar"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Cameras",
    url: "/cameras",
    icon: Camera,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const { isOpen } = useSidebar()

  return (
    <aside
      className={cn(
        "border-r bg-secondary/50 flex-col fixed left-0 top-0 z-20 flex h-screen w-64 overflow-y-auto border-r transition-all duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="border-b p-4">
        <h1 className="text-lg font-bold">VisionAI</h1>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {items.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            className={({ isActive }) =>
              cn(
                "group flex items-center space-x-2 rounded-md p-2 text-sm font-medium hover:underline",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground",
              )
            }
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex h-8 w-full items-center justify-between rounded-md">
              <Avatar className="mr-2 h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span>shadcn</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" forceMount>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Logout className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4 md:hidden">
            <SidebarClose className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full">
          {/* Mobile sidebar content here */}
        </SheetContent>
      </Sheet>
    </aside>
  )
}
