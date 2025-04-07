import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./LoginPage";
import RootLayout from "./RootLayout";
import LandingPage from "./pages/LandingPage";

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
          path: "/landing-page",
          element: <LandingPage />,
          handle: { title: "Home" },
        },
    ],
  },
]);
