import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import MechanicHeader from "../components/MechaHeader";

const MechanicLayout = ({ children }) => {
  return (
    <div className="w-[100%] h-[100%] bg-[#edf2f4]">
      <SignedIn>
        <div className="bg-[#075538] shadow-md border-b-4 border-[#CED46A]">
          <MechanicHeader />
        </div>
        <div className="h-full w-full">{children}</div>
      </SignedIn>
      <SignedOut>
        <div className="flex items-center justify-center h-screen bg-[#075538]">
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-[#CED46A] text-[#075538] hover:bg-[#bfc659]",
              },
            }}
          />
        </div>
      </SignedOut>
    </div>
  );
};

export default MechanicLayout;
