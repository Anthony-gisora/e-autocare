import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import Header from "../components/Header";

const AppLayout = ({ children }) => {
  return (
    <div className="w-[100%] h-[100%]">
      <SignedIn>
        <div className="">
          <Header />
        </div>
        <div className="h-full w-full">{children}</div>
      </SignedIn>
      <SignedOut>
        <SignIn />
      </SignedOut>
    </div>
  );
};

export default AppLayout;
