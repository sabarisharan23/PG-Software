import { Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "./components/ui/sonner";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
// import { Separator } from "../components/ui/separator"
import { AppSidebar } from "./modules/sidebar/app-sidebar";
import DashboardFooter from "./modules/DashboardFooter";
import { NavUser } from "./modules/sidebar/nav-user";
import { LucideBell } from "lucide-react";

export default function RootLayout() {
  const data = {
    user: {
      name: "sabarisharan23",
      email: "superadmin23@gmail.com",
      avatar: "/avatars/shadcn.jpg",
    },
  };
  return (
    <HelmetProvider>
      <>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />

                <div className="text-gray-500 hidden md:block">
                  {"Good Morning, Super Admin"}
                </div>
              </div>
              <div className="flex justify-center items-center gap-5 cursor-pointer">
                <div className="relative">
                  <LucideBell className="text-gray-600 h-6 w-6" />
                  <div className="absolute -top-2.5 -right-2 h-5 w-5 rounded-full flex justify-center items-center bg-red-500 text-white text-xs">
                    6
                  </div>
                </div>

                <NavUser user={data.user} />
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-[#f0f1f6]">
              <>
                <Outlet />
                <Toaster />
              </>
            </div>
          </SidebarInset>
        </SidebarProvider>
        <DashboardFooter />
      </>
    </HelmetProvider>
  );
}
