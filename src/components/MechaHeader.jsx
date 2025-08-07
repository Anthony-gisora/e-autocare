import { useState, useEffect } from "react";
import { useUser, useClerk, useAuth, UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

// Socket connection
const socket = io("https://roadmateassist.onrender.com"); // change if in production

const MechanicHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useUser();
  const { signOut } = useClerk();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  // Logout
  const handleSignOut = async () => {
    await signOut();
    navigate("/sign-in");
  };

  // Fetch mechanic notifications
  const fetchNotifications = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(
        "https://roadmateassist.onrender.com/api/req/requests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotifications(res.data);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };

  // Effect to load and listen for notifications
  useEffect(() => {
    fetchNotifications();

    socket.on("newMechanicNotification", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("newMechanicNotification");
    };
  }, []);

  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-[2000]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between relative">
        {/* Profile */}
        <div className="flex items-center space-x-3 cursor-pointer">
          <UserButton />
          <span className="font-bold text-[#2b2d42] hidden sm:inline">
            Hi, {user?.firstName}
          </span>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden cursor-pointer">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[#2b2d42]"
          >
            {menuOpen ? <CloseOutlinedIcon /> : <MenuOutlinedIcon />}
          </button>
        </div>

        {/* Navigation */}
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } absolute top-full left-0 w-full sm:static sm:block sm:w-auto bg-white sm:bg-transparent shadow-md sm:shadow-none`}
        >
          <ul className="flex flex-col sm:flex-row items-center sm:space-x-6 p-4 sm:p-0">
            <li>
              <button
                onClick={() => navigate("/mechanicHome")}
                className="block py-2 px-4 text-[#2b2d42] hover:underline"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/MechanicLogin")}
                className="block py-2 px-4 text-[#2b2d42] hover:underline"
              >
                Switch Account
              </button>
            </li>
            <li>
              <button
                onClick={handleSignOut}
                className="block py-2 px-4 text-[#2b2d42] hover:underline"
              >
                Sign Out
              </button>
            </li>
            <li className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="block py-2 px-4 text-[#2b2d42] hover:underline"
              >
                {menuOpen ? "Notifications" : <NotificationsNoneOutlinedIcon />}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50">
                  <div className="p-3 font-semibold text-[#2b2d42] border-b">
                    Notifications
                  </div>
                  <ul className="max-h-60 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <li className="px-4 py-2 text-sm text-[#8d99ae]">
                        No notifications
                      </li>
                    ) : (
                      notifications.map((note, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 hover:bg-[#f1f1f1] cursor-pointer"
                        >
                          <p className="font-medium text-sm text-[#2b2d42]">
                            {note.requestType || "New request"}
                          </p>
                          <p className="text-xs text-[#8d99ae]">
                            {note.details || "No details provided"}
                          </p>
                        </li>
                      ))
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

export default MechanicHeader;
