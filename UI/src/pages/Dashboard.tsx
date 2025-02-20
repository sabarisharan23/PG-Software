// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "../components/ui/breadcrumb"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";
// import { Separator } from "../components/ui/separator"
import { AppSidebar } from "../modules/sidebar/app-sidebar";
import DashboardFooter from "../modules/DashboardFooter";
import { NavUser } from "../modules/sidebar/nav-user";
import { LucideBell } from "lucide-react";

export default function Dashboard() {
  const data = {
    user: {
      name: "sabarisharan23",
      email: "superadmin23@gmail.com",
      avatar: "/avatars/shadcn.jpg",
    },
  };
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
              {/* <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage> 
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
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
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          </div>
        </SidebarInset>
      </SidebarProvider>
      <DashboardFooter />
    </>
  );
}
