import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";

const PUBLISHED_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHED_KEY) {
  throw new Error("Encountered a problem with the clark key...! ");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={PUBLISHED_KEY} afterSignOutUrl="/signin">
        <SignedIn>
          <App />
        </SignedIn>
        <SignedOut>
          <div>Signin please</div>
        </SignedOut>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>
);
