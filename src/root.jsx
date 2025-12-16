import { Routes, Route } from "react-router-dom";
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
