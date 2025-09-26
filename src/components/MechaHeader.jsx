import { useState, useEffect } from "react";
import { useUser, useClerk, UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useMechanic } from "../context/mechanicContext";

const socket = io("https://roadmateassist.onrender.com");

const MechanicHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const { mechanic } = useMechanic();

  const handleSignOut = async () => {
    await signOut();
    navigate("/sign-in");
  };

  const fetchInProgressNotifications = async () => {
    try {
      const res = await axios.get(
        "https://roadmateassist.onrender.com/api/notifications/reqNotification"
      );
      const inProgressOnly = res.data.filter(
        (note) =>
          note.status?.toLowerCase() === "inprogress" &&
          mechanic.personalNumber == note.servicedBy
      );
      setNotifications(inProgressOnly);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };

  const markComplete = async (id) => {
    try {
      await axios.put(
        `https://roadmateassist.onrender.com/api/req/update-complete/${id}`,
        { servicedBy: mechanic.personalNumber }
      );

      socket.emit("request-updated", {
        requestId: id,
        message: "Your request has been completed by the mechanic.",
      });

      fetchInProgressNotifications();
    } catch (error) {
      console.error("Error completing request:", error);
    }
  };

  useEffect(() => {
    fetchInProgressNotifications();

    socket.on("newMechanicNotification", async () => {
      await fetchInProgressNotifications();
    });

    return () => {
      socket.off("newMechanicNotification");
    };
  }, []);

  return (
    <header className="w-full bg-[#075538] shadow-md fixed top-0 left-0 z-[2000]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between relative">
        {/* Left: Profile */}
        <div className="flex items-center space-x-3 cursor-pointer">
          <UserButton />
          <span className="font-bold text-white hidden sm:inline">
            Hi, {user?.firstName}
          </span>
        </div>

        {/* Mobile toggle */}
        <div className="flex sm:hidden cursor-pointer">
          {!menuOpen ? (
            <div>
              <button
                onClick={() => setShowNotifications((prev) => !prev)}
                className="block py-2 px-4 text-white hover:text-[#CED46A] cursor-pointer"
              >
                {menuOpen ? "Notifications" : <NotificationsNoneOutlinedIcon />}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-3 font-semibold text-[#075538] border-b bg-[#CED46A]">
                    Notifications
                  </div>
                  <ul className="max-h-60 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((note, idx) => (
                        <li
                          key={idx}
                          className="px-4 py-2 hover:bg-[#CED46A]/40 cursor-pointer"
                        >
                          <p className="font-medium text-sm text-[#075538]">
                            {note.requestType}
                          </p>
                          <p className="text-xs text-gray-600">
                            {note.details}
                          </p>

                          {note.status === "completed" ? (
                            <p
                              className={`text-xs mt-1 font-semibold ${
                                note.status === "pending"
                                  ? "text-yellow-600"
                                  : note.status === "approved"
                                  ? "text-green-700"
                                  : "text-red-600"
                              }`}
                            >
                              {note.status}
                            </p>
                          ) : (
                            <button
                              className={`text-xs mt-1 font-semibold border p-[3px] rounded-[7px] ${
                                note.status === "pending"
                                  ? "text-yellow-600"
                                  : note.status === "InProgress"
                                  ? "text-green-700"
                                  : "text-red-600"
                              }`}
                              onClick={() => markComplete(note._id)}
                            >
                              Complete
                            </button>
                          )}
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-2 text-sm text-gray-500">
                        No notifications yet
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          ) : null}
          <button
            className="text-white font-semibold"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <CloseOutlinedIcon /> : <MenuOutlinedIcon />}
          </button>
        </div>

        {/* Nav */}
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } absolute top-full left-0 w-full sm:static sm:block sm:w-auto bg-[#075538f7] sm:bg-transparent sm:shadow-none shadow-md`}
        >
          <ul className="flex flex-col sm:flex-row items-center sm:space-x-6 p-4 sm:p-0">
            <li>
              <button
                onClick={() => navigate("/")}
                className="block py-2 px-4 text-[#CED46A] hover:text-[#CED46A] cursor-pointer"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/about")}
                className="block py-2 px-4 text-[#CED46A] hover:text-[#CED46A] cursor-pointer"
              >
                About Us
              </button>
            </li>

            <li>
              <button
                onClick={handleSignOut}
                className="block py-2 px-4 text-[#CED46A] hover:text-[#CED46A] cursor-pointer"
              >
                Sign Out
              </button>
            </li>
            <li className="relative">
              <button
                onClick={() => setShowNotifications((prev) => !prev)}
                className="block py-2 px-4 text-[#CED46A] hover:text-[#CED46A] cursor-pointer"
              >
                {menuOpen ? "Notifications" : <NotificationsNoneOutlinedIcon />}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-3 font-semibold text-[#075538] border-b bg-[#CED46A]">
                    Notifications
                  </div>
                  <ul className="max-h-60 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((note, idx) => (
                        <li
                          key={idx}
                          className="px-4 py-2 hover:bg-[#CED46A]/40 cursor-pointer"
                        >
                          <p className="font-medium text-sm text-[#075538]">
                            {note.requestType}
                          </p>
                          <p className="text-xs text-gray-600">
                            {note.details}
                          </p>
                          <p
                            className={`text-xs mt-1 font-semibold ${
                              note.status === "pending"
                                ? "text-yellow-600"
                                : note.status === "approved"
                                ? "text-green-700"
                                : "text-red-600"
                            }`}
                          >
                            {note.status}
                          </p>
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-2 text-sm text-gray-500">
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

export default MechanicHeader;
