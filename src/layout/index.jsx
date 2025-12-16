import { useLocation } from "react-router-dom";
import Footer from "./footer";
import Navbar from "./navbar";

function Layout({ children }) {
  const location = useLocation();
  const hideFooterPaths = ["/registration", "/kids", "/general"];
  const shouldHideFooter = hideFooterPaths.includes(location.pathname);

  return (
    <div className="main max-w-[1920px] w-full mx-auto">
      <Navbar />
      <div className="pt-24 sm:pt-28">
        {children}
      </div>
      {!shouldHideFooter && <Footer />}
    </div>
  );
}

export default Layout;