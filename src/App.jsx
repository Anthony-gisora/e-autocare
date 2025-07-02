import "./App.css";
import LandingPage from "./components/LandingPage";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import AppLayout from "./layouts/AppLayout";
import RequestService from "./pages/RequestService/RequestService";

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
        path="/request-service/:id"
        element={
          <AppLayout>
            <RequestService />
          </AppLayout>
        }
      />
    </Routes>
  );
}

export default App;
