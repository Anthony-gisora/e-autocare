import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import AdminHeader from "../components/AdminHeader";

const MechanicLayout = ({ children }) => {
  return (
    <div className="w-[100%] h-[100%]">
      <SignedIn>
        <div className="">
          <AdminHeader />
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
