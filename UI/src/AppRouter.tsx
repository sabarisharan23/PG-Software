import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import LoginPage from "./LoginPage";
// import Dashboard from "./pages/dashboard/Dashboard";
import UserList from "./pages/userPage/UserList";
import DashboardFn from "./pages/dashboard/DashboardFn";
import AddUser from "./pages/userPage/AddUser";
import PgList from "./pages/Pg/PgList";
import AddPg from "./pages/Pg/addPg";
import RoomList from "./pages/room/RoomList";
import AddRoom from "./pages/room/AddRoom";
import RoomTenants from "./pages/room/RoomTenant/RoomTenantsList";
import AddRoomTenant from "./pages/room/RoomTenant/AddRoomTenant";
import TenantRequestList from "./pages/tenantRequest/TenantRequestList";
import AddTenantRequest from "./pages/tenantRequest/AddTenantRequest";
import AssignedAdminList from "./pages/adminAssignment/AssignedAdminList";
import AddAssignedAdmin from "./pages/adminAssignment/AddAssignedAdmin";
// import RootLayout from "./RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />, // Show Login page first
    handle: { title: "Login" },
  },
  {
    path: "/",
    element: <RootLayout />, // Add a layout component later if needed
    children: [
      {
        path: "/dashboard",
        element: <DashboardFn />,
        handle: { title: "Home" },
      },
      {
        path: "/user-list",
        element: <UserList />,
        handle: { title: "Home" },
      },
      {
        path: "/add-user",
        element: <AddUser />,
        handle: { title: "Home" },
      },
      {
        path: "/add-user/:id",
        element: <AddUser />,
        handle: { title: "Home" },
      },
      {
        path: "/pg-list",
        element: <PgList />,
        handle: { title: "Home" },
      },
      {
        path: "/add-pg",
        element: <AddPg />,
        handle: { title: "Home" },
      },
      {
        path: "/add-pg/:id",
        element: <AddPg />,
        handle: { title: "Home" },
      },
      {
        path: "/room-list",
        element: <RoomList />,
        handle: { title: "Home" },
      },
      {
        path: "/add-room",
        element: <AddRoom />,
        handle: { title: "Home" },
      },
      {
        path: "/add-room/:id",
        element: <AddRoom />,
        handle: { title: "Home" },
      },
      {
        path: "/room-tenants",
        element: <RoomTenants />,
        handle: { title: "Home" },
      },
      {
        path: "/add-roomTenant",
        element: <AddRoomTenant />,
        handle: { title: "Home" },
      },
      {
        path: "/add-roomTenant/:userId/:roomId",
        element: <AddRoomTenant />,
        handle: { title: "Home" },
      },
      {
        path: "/tenant-request",
        element: <TenantRequestList />,
        handle: { title: "Home" },
      },
      {
        path: "/add-tenantRequest",
        element: <AddTenantRequest/>,
        handle: { title: "Home" },
      },
      {
        path: "/assigned-admin",
        element: <AssignedAdminList/>,
        handle: { title: "Home" },
      },
      {
        path: "/add-assignedAdmin",
        element: <AddAssignedAdmin/>,
        handle: { title: "Home" },
      },
      {
        path: "/add-assignedAdmin/:adminId/:pgId",
        element: <AddAssignedAdmin/>,
        handle: { title: "Home" },
      },
    ],
  },
]);
