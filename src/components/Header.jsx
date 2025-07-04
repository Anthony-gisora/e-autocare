import { useState } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-[2000]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Profile image */}
        <div className="flex items-center space-x-3">
          <img
            src={user.imageUrl}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-[#2b2d42] object-cover"
          />
          <span className="font-bold text-[#2b2d42] hidden sm:inline">
            Hi, {user.firstName}
          </span>
        </div>

        {/* Right: Navigation */}
        <div className="block sm:hidden">
          <button
            className="text-[#2b2d42] font-semibold"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } absolute top-full left-0 w-full sm:static sm:block sm:w-auto bg-white sm:bg-transparent sm:shadow-none shadow-md`}
        >
          <ul className="flex flex-col sm:flex-row items-center sm:space-x-6 p-4 sm:p-0">
            <li>
              <a
                href="/"
                className="block py-2 px-4 text-[#2b2d42] hover:underline"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="block py-2 px-4 text-[#2b2d42] hover:underline"
              >
                About Us
              </a>
            </li>
            <li>
              <button
                onClick={() => signOut()}
                className="block py-2 px-4 text-[#2b2d42] hover:underline"
              >
                Switch Account
              </button>
            </li>
            <li>
              <button
                onClick={() => signOut()}
                className="block py-2 px-4 text-[#2b2d42] hover:underline"
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
