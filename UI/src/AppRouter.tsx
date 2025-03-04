import {  createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import LoginPage from "./LoginPage";
// import Dashboard from "./pages/dashboard/Dashboard";
import UserList from "./pages/userPage/UserList";
import DashboardFn from "./pages/dashboard/DashboardFn";
import AddUser from "./pages/userPage/AddUser";
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
        ],
      },
    ]);
