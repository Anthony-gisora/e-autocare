import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import MechanicHeader from "../components/MechanicHeader";

const MechanicLayout = ({ children }) => {
  return (
    <div className="w-full h-full bg-[#edf2f4]">
      <SignedIn>
        {/* Header */}
        <div className="shadow-md">
          <MechanicHeader />
        </div>

        {/* Page Content */}
        <div className="h-full w-full pt-20 px-4">{children}</div>
      </SignedIn>

      <SignedOut>
        <div className="flex items-center justify-center h-screen">
          <SignIn />
        </div>
      </SignedOut>
    </div>
  );
};

export default MechanicLayout;
