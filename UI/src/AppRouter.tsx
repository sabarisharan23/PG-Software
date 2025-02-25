import { Outlet, createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import LoginPage from "./LoginPage";
import Dashboard from "./pages/dashboard/Dashboard";
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
            element: <Dashboard />,
            handle: { title: "Home" },
          },
        ],
      },
    ]);
