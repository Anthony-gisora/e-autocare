import "./App.css";
import LandingPage from "./components/LandingPage";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
