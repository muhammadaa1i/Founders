import { useLocation } from "react-router-dom";
import Footer from "./footer";
import Navbar from "./navbar";

function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="main max-w-[1920px] w-full mx-auto">
      <Navbar />
      {children}
      {location.pathname !== "/registration" && <Footer />}
    </div>
  );
}

export default Layout;
