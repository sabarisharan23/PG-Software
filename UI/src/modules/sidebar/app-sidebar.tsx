"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  LayoutDashboard,
  User2Icon,
  LucideHome,
  LucideHotel,
  LucideGitPullRequest,
  Frame,
  PieChart,
  Map,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../../components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";

// Updated sidebar structure with isActive
const data = {
  teams: [
    { name: "Acme Inc", logo: LucideHome, plan: "Enterprise" },
    { name: "Acme Corp.", logo: AudioWaveform, plan: "Startup" },
    { name: "Evil Corp.", logo: Command, plan: "Free" },
  ],
  mainMenu: {
    label: "Main Menu",
    items: [
      {
        title: "Dashboard",
        url: "#",
        icon: LayoutDashboard,
        isActive: true, // Example: Active menu item
      },
    ],
  },
  navGroups: [
    {
      label: "Management",
      items: [
        {
          title: "User Management",
          url: "#",
          icon: User2Icon,
          isActive: false,
          items: [
            { title: "User List", url: "#" },
            { title: "Add User", url: "#" },
            { title: "Update User", url: "#" },
            { title: "Delete User", url: "#" },
          ],
        },
        {
          title: "PG Management",
          url: "#",
          icon: LucideHotel,
          isActive: false,
          items: [
            { title: "PG List", url: "#" },
            { title: "Add PG's", url: "#" },
            { title: "Update PG's", url: "#" },
            { title: "Delete PG's", url: "#" },
          ],
        },
        {
          title: "Room Management",
          url: "#",
          icon: LucideHome,
          isActive: false,
          items: [
            { title: "Room List", url: "#" },
            { title: "Add Rooms", url: "#" },
            { title: "Update Rooms", url: "#" },
            { title: "Delete Rooms", url: "#" },
          ],
        },
      ],
    },
    {
      label: "Requests & Approvals",
      items: [
        { title: "Tenant Requests", url: "#", icon: LucideGitPullRequest, isActive: false },
      ],
    },
    {
      label: "Administration",
      items: [{ title: "Admin Management", url: "#", isActive: false }],
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
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain main={data.mainMenu} groups={data.navGroups} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>{/* Optional Footer Content */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
