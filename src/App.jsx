import "./App.css";
import LandingPage from "./components/LandingPage";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import Header from "./components/Header";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <SignedIn>
              <Header />
              <Home />
            </SignedIn>
            <SignedOut>
              <SignIn />
            </SignedOut>
          </>
        }
      />
      <Route
        path="/signin"
        element={
          <>
            <SignedOut>
              <div className="">
                <SignIn />
              </div>
            </SignedOut>
          </>
        }
      />
    </Routes>
  );
}

export default App;
