import "./App.css";
import LandingPage from "./components/LandingPage";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import AppLayout from "./layouts/AppLayout";
import RequestService from "./pages/RequestService/RequestService";
import AboutUs from "./pages/AboutUs/AboutUs";
import MechanicRequest from "./pages/Mechanic/Mechanic";
import MechanicHome from "./pages/Mechanic/MechaHome/MechaHome";

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
      <Route
        path="/mechanicHome"
        element={
          <AppLayout>
            <MechanicHome />
          </AppLayout>
        }
      />
    </Routes>
  );
}

export default App;
