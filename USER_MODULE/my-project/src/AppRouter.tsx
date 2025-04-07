import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./LoginPage";
import RootLayout from "./RootLayout";

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
      //   {
      //     path: "/dashboard",
      //     element: <DashboardFn />,
      //     handle: { title: "Home" },
      //   },
    ],
  },
]);
