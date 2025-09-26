import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { MechanicProvider } from "./context/mechanicContext.jsx";

const PUBLISHED_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHED_KEY) {
  throw new Error("Encountered a problem with the clark key...! ");
} else {
  console.log("Clerk in sync...!");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={PUBLISHED_KEY}>
        <MechanicProvider>
          <App />
        </MechanicProvider>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>
);
