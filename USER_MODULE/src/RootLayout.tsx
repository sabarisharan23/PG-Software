import { Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "./pages/Header";
import Footer from "./pages/Footer";

export default function RootLayout() {
  return (
    <HelmetProvider>
      <>
        <Header />
        <Outlet />
        <Footer/>
      </>
    </HelmetProvider>
  );
}
