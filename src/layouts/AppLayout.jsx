import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import Header from "../components/Header";

const AppLayout = ({ children }) => {
  return (
    <div className="w-full h-full">
      <SignedIn>
        <div className="">
          <Header />
        </div>
        <div className="">{children}</div>
      </SignedIn>
      <SignedOut>
        <SignIn />
      </SignedOut>
    </div>
  );
};

export default AppLayout;
