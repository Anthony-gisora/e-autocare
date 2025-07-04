import { useState } from "react";
import { useUser, useClerk, UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/sign-in");
  };

  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-[2000]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Profile */}
        <div className="flex items-center space-x-3 cursor-pointer">
          <UserButton />
          <span className="font-bold text-[#2b2d42] hidden sm:inline">
            Hi, {user.firstName}
          </span>
        </div>

        {/* Mobile toggle */}
        <div className="block sm:hidden cursor-pointer">
          <button
            className="text-[#2b2d42] font-semibold"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {/* Nav links */}
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } absolute top-full left-0 w-full sm:static sm:block sm:w-auto bg-white sm:bg-transparent sm:shadow-none shadow-md `}
        >
          <ul className="flex flex-col sm:flex-row items-center sm:space-x-6 p-4 sm:p-0 ">
            <li>
              <button
                onClick={() => navigate("/")}
                className="block py-2 px-4 text-[#2b2d42] hover:underline cursor-pointer"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/about")}
                className="block py-2 px-4 text-[#2b2d42] hover:underline cursor-pointer"
              >
                About Us
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/switch")}
                className="block py-2 px-4 text-[#2b2d42] hover:underline cursor-pointer"
              >
                Switch Account
              </button>
            </li>
            <li>
              <button
                onClick={handleSignOut}
                className="block py-2 px-4 text-[#2b2d42] hover:underline cursor-pointer"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
