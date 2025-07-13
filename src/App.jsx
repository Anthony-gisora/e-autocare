import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import AppLayout from "./layouts/AppLayout";
import RequestService from "./pages/RequestService/RequestService";
import AboutUs from "./pages/AboutUs/AboutUs";
import MechanicRequest from "./pages/Mechanic/Mechanic";
import MechanicHome from "./pages/Mechanic/MechaHome/MechaHome";
import MechanicLogin from "./pages/signs/mechanicSignIn";
import MechanicLayout from "./layouts/MechaLayout";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout>
            <Home />
          </AppLayout>
        }
      />
      <Route
        path="/mechReq/:user"
        element={
          <AppLayout>
            <MechanicRequest />
          </AppLayout>
        }
      />
      <Route
        path="/request-service/:id"
        element={
          <AppLayout>
            <RequestService />
          </AppLayout>
        }
      />
      <Route
        path="/about"
        element={
          <AppLayout>
            <AboutUs />
          </AppLayout>
        }
      />
      <Route path="/MechanicLogin" element={<MechanicLogin />} />
      <Route
        path="/mechanicHome"
        element={
          <MechanicLayout>
            <MechanicHome />
          </MechanicLayout>
        }
      />
    </Routes>
  );
}

export default App;
