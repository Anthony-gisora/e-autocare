import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import AdminHeader from "../components/AdminHeader";
import Header from "../components/Header";

// mechanic
const MechanicLayout = ({ children }) => {
  return (
    <div className="w-[100%] h-[100%] bg-[#edf2f4]">
      <SignedIn>
        <div className="bg-[#075538] shadow-md">
          <Header />
        </div>
        <div className="h-full w-full">{children}</div>
      </SignedIn>
      <SignedOut>
        <div className="flex items-center justify-center h-screen bg-[#075538]">
          <SignIn
            appearance={{
              elements: { formButtonPrimary: "bg-[#CED46A] text-[#075538]" },
            }}
          />
        </div>
      </SignedOut>
    </div>
  );
};

export default MechanicLayout;
