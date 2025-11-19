import { Calendar, Home, Inbox} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Uploads",
    url: "/dashboard/upload",
    icon: Inbox,
  },
  {
    title: "History",
    url: "/dashboard/history",
    icon: Calendar,
  },
  
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl font-bold mx-auto">CleanStream</SidebarGroupLabel>
          <SidebarGroupContent >
            <SidebarMenu className="mt-6 mx-auto">
              {items.map((item) => (
                <SidebarMenuItem  key={item.title}>
                  <SidebarMenuButton asChild>
                    <a  href={item.url}>
                      <item.icon className="text-lg mt-2 font-bold"/>
                      <span className="text-lg mt-2 font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}