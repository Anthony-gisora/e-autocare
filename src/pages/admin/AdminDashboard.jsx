import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Users, Wrench, ClipboardList, CheckCircle } from "lucide-react";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [mechanics, setMechanics] = useState([]);

  // Fetch Requests
  const fetchRequests = async () => {
    try {
      const { data } = await axios.get(
        "https://roadmateassist.onrender.com/api/notifications/reqNotification"
      );
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        "https://roadmateassist.onrender.com/api/users"
      );
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch Mechanics
  const fetchMechanics = async () => {
    try {
      const { data } = await axios.get(
        "https://roadmateassist.onrender.com/api/mechanics"
      );
      setMechanics(data);
    } catch (error) {
      console.error("Error fetching mechanics:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchUsers();
    fetchMechanics();
  }, []);

  // Stats
  const totalCompleted = requests.filter(
    (r) => r.status === "completed"
  ).length;
  const totalInProgress = requests.filter(
    (r) => r.status === "inProgress"
  ).length;
  const totalPending = requests.filter((r) => r.status === "pending").length;

  // Data for charts
  const statusData = [
    { name: "Pending", value: totalPending },
    { name: "In Progress", value: totalInProgress },
    { name: "Completed", value: totalCompleted },
  ];

  const COLORS = ["#FBBF24", "#3B82F6", "#10B981"];

  const barData = [
    { name: "Requests", value: requests.length },
    { name: "Users", value: users.length },
    { name: "Mechanics", value: mechanics.length },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 sm:mb-8">
        📊 Admin Dashboard
      </h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow flex items-center gap-4">
          <ClipboardList className="text-blue-500 w-8 h-8 sm:w-10 sm:h-10" />
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-600">
              Total Requests
            </h3>
            <p className="text-xl sm:text-2xl font-bold">{requests.length}</p>
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow flex items-center gap-4">
          <Users className="text-indigo-500 w-8 h-8 sm:w-10 sm:h-10" />
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-600">
              Users
            </h3>
            <p className="text-xl sm:text-2xl font-bold">{users.length}</p>
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow flex items-center gap-4">
          <Wrench className="text-red-500 w-8 h-8 sm:w-10 sm:h-10" />
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-600">
              Mechanics
            </h3>
            <p className="text-xl sm:text-2xl font-bold">{mechanics.length}</p>
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow flex items-center gap-4">
          <CheckCircle className="text-green-500 w-8 h-8 sm:w-10 sm:h-10" />
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-600">
              Completed
            </h3>
            <p className="text-xl sm:text-2xl font-bold">{totalCompleted}</p>
          </div>
        </div>
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Bar Chart */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
          <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-700">
            Overview
          </h2>
          <ResponsiveContainer
            width="100%"
            height={250}
            className="sm:h-[300px]"
          >
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
          <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-700">
            Requests Status
          </h2>
          <ResponsiveContainer
            width="100%"
            height={250}
            className="sm:h-[300px]"
          >
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {statusData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Requests Table */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Recent Requests
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border rounded-lg overflow-hidden text-sm sm:text-base">
            <thead className="bg-gray-200 text-gray-700 sticky top-0">
              <tr>
                <th className="py-3 px-4 border">Type</th>
                <th className="py-3 px-4 border">Details</th>
                <th className="py-3 px-4 border">Status</th>
                <th className="py-3 px-4 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {requests.slice(0, 8).map((req) => (
                <tr
                  key={req._id}
                  className="hover:bg-gray-100 transition duration-200"
                >
                  <td className="py-3 px-4 border">{req.requestType}</td>
                  <td className="py-3 px-4 border truncate max-w-[200px] sm:max-w-[300px]">
                    {req.details}
                  </td>
                  <td
                    className={`py-3 px-4 border font-semibold ${
                      req.status === "pending"
                        ? "text-yellow-600"
                        : req.status === "completed"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  >
                    {req.status}
                  </td>
                  <td className="py-3 px-4 border whitespace-nowrap">
                    {new Date(req.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No requests available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
