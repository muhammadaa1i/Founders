import { useLocation } from "react-router-dom";
import Footer from "./footer";
import Navbar from "./navbar";

function Layout({ children }) {
  const location = useLocation();

  // Footerni ko‘rsatilmasligi kerak bo‘lgan yo‘llar
  const hideFooterPaths = ["/registration", "/kids", "/general"];
  const shouldHideFooter = hideFooterPaths.includes(location.pathname);

  return (
    <div className="main max-w-[1920px] w-full mx-auto">
      <Navbar />
      {children}
      {!shouldHideFooter && <Footer />}
    </div>
  );
}

export default Layout;