import { Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/home";
import RegistrationForm from "./pages/auth";
import Kids from "./pages/test/kids";
import General from "./pages/test/general";

function Root() {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/kids" element={<Kids/>} />
        <Route path="/general" element={<General />} />
      </Routes>
    </Layout>
  );
}

export default Root;
