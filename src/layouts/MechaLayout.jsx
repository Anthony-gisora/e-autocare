import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import MechanicHeader from "../components/MechaHeader";

const MechanicLayout = ({ children }) => {
  return (
    <div className="w-[100%] h-[100%]">
      <SignedIn>
        <div className="">
          <MechanicHeader />
        </div>
        <div className="h-full w-full">{children}</div>
      </SignedIn>
      <SignedOut>
        <SignIn />
      </SignedOut>
    </div>
  );
};

export default MechanicLayout;
