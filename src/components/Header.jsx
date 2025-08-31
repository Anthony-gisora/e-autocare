import { useState, useEffect } from "react";
import { useUser, useClerk, UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/sign-in");
  };

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user?.id) return;
      try {
        const res = await fetch(
          "https://roadmateassist.onrender.com/api/notifications/reqNotification"
        );
        const data = await res.json();

        // Filter by driverId === current user.id
        const userNotifications = data.filter(
          (note) => note.driverId === user.id
        );

        setNotifications(userNotifications);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    fetchNotifications();
  }, [user?.id]);

  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-[2000]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between relative">
        {/* Left: Profile */}
        <div className="flex items-center space-x-3 cursor-pointer">
          <UserButton />
          <span className="font-bold text-[#2b2d42] hidden sm:inline">
            Hi, {user.firstName}
          </span>
        </div>

        {/* Mobile toggle */}
        <div className="flex sm:hidden cursor-pointer">
          {!menuOpen ? (
            <div>
              <button
                onClick={() => setShowNotifications((prev) => !prev)}
                className="block py-2 px-4 text-[#2b2d42] hover:underline cursor-pointer"
              >
                {menuOpen ? "Notifications" : <NotificationsNoneOutlinedIcon />}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-3 font-semibold text-[#2b2d42] border-b">
                    Notifications
                  </div>
                  <ul className="max-h-60 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((note, idx) => (
                        <li
                          key={idx}
                          className="px-4 py-2 hover:bg-[#f1f1f1] cursor-pointer"
                        >
                          <p className="font-medium text-sm text-[#2b2d42]">
                            {note.requestType}
                          </p>
                          <p className="text-xs text-[#8d99ae]">
                            {note.details}
                          </p>
                          <p
                            className={`text-xs mt-1 font-semibold ${
                              note.status === "pending"
                                ? "text-yellow-500"
                                : note.status === "approved"
                                ? "text-green-600"
                                : "text-red-500"
                            }`}
                          >
                            {note.status}
                          </p>
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-2 text-sm text-[#8d99ae]">
                        No notifications yet
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          ) : null}
          <button
            className="text-[#2b2d42] font-semibold"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <CloseOutlinedIcon /> : <MenuOutlinedIcon />}
          </button>
        </div>

        {/* Nav */}
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } absolute top-full left-0 w-full sm:static sm:block sm:w-auto bg-white sm:bg-transparent sm:shadow-none shadow-md`}
        >
          <ul className="flex flex-col sm:flex-row items-center sm:space-x-6 p-4 sm:p-0">
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
                onClick={() => navigate(`/MechanicLogin`)}
                className="block py-2 px-4 text-[#2b2d42] hover:underline cursor-pointer"
              >
                mechanic login
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
            <li className="relative">
              <button
                onClick={() => setShowNotifications((prev) => !prev)}
                className="block py-2 px-4 text-[#2b2d42] hover:underline cursor-pointer"
              >
                {menuOpen ? "Notifications" : <NotificationsNoneOutlinedIcon />}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-3 font-semibold text-[#2b2d42] border-b">
                    Notifications
                  </div>
                  <ul className="max-h-60 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((note, idx) => (
                        <li
                          key={idx}
                          className="px-4 py-2 hover:bg-[#f1f1f1] cursor-pointer"
                        >
                          <p className="font-medium text-sm text-[#2b2d42]">
                            {note.requestType}
                          </p>
                          <p className="text-xs text-[#8d99ae]">
                            {note.details}
                          </p>
                          <p
                            className={`text-xs mt-1 font-semibold ${
                              note.status === "pending"
                                ? "text-yellow-500"
                                : note.status === "approved"
                                ? "text-green-600"
                                : "text-red-500"
                            }`}
                          >
                            {note.status}
                          </p>
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-2 text-sm text-[#8d99ae]">
                        No notifications yet
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
