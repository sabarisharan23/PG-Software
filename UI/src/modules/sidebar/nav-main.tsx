"use client";

import { LucideIcon, ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../../components/ui/sidebar";

export function NavMain({
  main,
  groups,
}: {
  main: {
    label: string;
    items: {
      title: string;
      url: string;
      icon: LucideIcon;
      isActive?: boolean;
    }[];
  };
  groups: {
    label: string;
    items: {
      title: string;
      url: string;
      icon?: LucideIcon;
      items?: { title: string; url: string }[];
      isActive?: boolean;
    }[];
  }[];
}) {
  return (
    <>
      {/* Main Navigation Section */}
      <SidebarGroup>
        <SidebarGroupLabel>{main.label}</SidebarGroupLabel>
        <SidebarMenu>
          {main.items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} asChild>
                <a href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>

      {/* Render Grouped Navigation Items */}
      {groups.map((group) => (
        <SidebarGroup key={group.label}>
          <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
          <SidebarMenu>
            {group.items.map((item) => (
              <Collapsible
                key={item.title}
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                {" "}
                <SidebarMenuItem className="peer">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className="flex items-center"
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>

                      {/* Show and rotate the Chevron only if there are sub-items */}
                      {item.items && item.items.length > 0 && (
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  {/* Render Submenu if items exist */}
                  {item.items && item.items.length > 0 && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <a href={subItem.url}>
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
