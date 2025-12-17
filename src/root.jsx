import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./layout";
import Home from "./pages/home";
import RegistrationForm from "./pages/auth/index";
import Kids from "./pages/test/kids";
import General from "./pages/test/general";
import Perception from "./pages/test/perception";
import Temperament from "./pages/test/temperament";
import TemperamentGeneral from "./pages/test/temperamentGeneral";
import IQKids from "./pages/test/iqKids";
import IQGeneral from "./pages/test/iqGeneral";

function Root() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change, but respect hash navigation
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  // Prevent initial scroll to hash on page load
  useEffect(() => {
    // Disable scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Force scroll to top on initial load
    const timeout = setTimeout(() => {
      if (location.pathname === '/' && location.hash) {
        window.history.replaceState(null, null, location.pathname);
        window.scrollTo(0, 0);
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/kids" element={<Kids/>} />
        <Route path="/general" element={<General />} />
        <Route path="/perception" element={<Perception />} />
        <Route path="/temperament" element={<Temperament />} />
        <Route path="/temperament-general" element={<TemperamentGeneral />} />
        <Route path="/iq-kids" element={<IQKids />} />
        <Route path="/iq-general" element={<IQGeneral />} />
      </Routes>
    </Layout>
  );
}

export default Root;
