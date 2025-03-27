import { Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/home";
import RegistrationForm from "./pages/auth";

function Root() {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<RegistrationForm />} />
      </Routes>
    </Layout>
  );
}

export default Root;
