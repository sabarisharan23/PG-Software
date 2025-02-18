import { Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "./components/ui/sonner";

export default function RootLayout() {
  return (
    <HelmetProvider>
      <>
        <Outlet />
        <Toaster /> {/* Include the Toaster component at the root level */}
      </>
    </HelmetProvider>
  );
}
