"use client"

import * as React from "react"
import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  LayoutDashboard,
  User2Icon,
  LucideHome,
  LucideHotel,
   LucideGitPullRequest,

} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../../components/ui/sidebar"
import { TeamSwitcher } from "./team-switcher"
import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      
    },
    {
      title: "User Management",
      url: "#",
      icon: User2Icon,
      items: [
        {
          title: "Add User",
          url: "#",
        },
        {
          title: "Update User",
          url: "#",
        },
        {
          title: "Delete User",
          url: "#",
        },
      ],
    },
    {
      title: "PG Management",
      url: "#",
      icon: LucideHotel,
      items: [
        {
          title: "Add PG's",
          url: "#",
        },
        {
          title: "Update PG's",
          url: "#",
        },
        {
          title: "Delete PG's",
          url: "#",
        },
       
      ],
    },
    {
      title: "Room Management",
      url: "#",
      icon: LucideHome,
      items: [
        {
          title: "Add Rooms",
          url: "#",
        },
        {
          title: "Update Rooms",
          url: "#",
        },
        {
          title: "Delete Rooms",
          url: "#",
        },
       
      ],
    },
    {
      title: "Tenant Requests",
      url: "#",
      icon: LucideGitPullRequest,
      
    },
    {
      title: "Admin Managements",
      url: "#",
      
    },
   
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
