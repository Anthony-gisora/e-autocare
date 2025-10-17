import { useEffect, useState } from "react";
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
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { Users, Wrench, ClipboardList, CheckCircle, Clock } from "lucide-react";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [pendingMechanics, setPendingMechanics] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ status: "", servicedBy: "" });

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
      axios
        .get("https://roadmateassist.onrender.com/api/admin/clerkUsers")
        .then((res) => setUsers(res.data))
        .catch((err) => console.error(err));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch Mechanics
  const fetchMechanics = async () => {
    try {
      const { data } = await axios.get(
        "https://roadmateassist.onrender.com/api/admin/mechanics"
      );
      setMechanics(data);
    } catch (error) {
      console.error("Error fetching mechanics:", error);
    }
  };

  // weekly trends
  useEffect(() => {
    if (requests.length > 0) {
      const grouped = {};

      requests.forEach((req) => {
        const date = new Date(req.createdAt);
        const week = `Week ${Math.ceil(date.getDate() / 7)}`;

        if (!grouped[week]) {
          grouped[week] = {
            name: week,
            pending: 0,
            inProgress: 0,
            completed: 0,
          };
        }

        const status = req.status?.toLowerCase();
        if (status === "pending") grouped[week].pending += 1;
        if (status === "inprogress") grouped[week].inProgress += 1;
        if (status === "completed") grouped[week].completed += 1;
      });

      const formatted = Object.values(grouped).sort((a, b) => {
        const aNum = parseInt(a.name.replace("Week ", ""), 10);
        const bNum = parseInt(b.name.replace("Week ", ""), 10);
        return aNum - bNum;
      });

      setProgressData(formatted);
    }
  }, [requests]);

  // handle open modal
  const handleView = (req) => {
    setSelectedRequest(req);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (req) => {
    setSelectedRequest(req);
    setFormData({
      status: req.status || "",
      servicedBy: req.servicedBy || "",
    });
    setIsEditing(true);
    setShowModal(true);
  };

  // handle update
  const handleUpdate = async () => {
    try {
      if (formData.status.toLowerCase() === "pending") {
        await axios.post(
          "https://roadmateassist.onrender.com/api/req/requests",
          { ...selectedRequest, status: "pending" }
        );
      } else {
        await axios.put(
          `https://roadmateassist.onrender.com/api/req/update-status/${selectedRequest._id}`,
          {
            status: formData.status,
            servicedBy: formData.servicedBy,
          }
        );
      }
      setShowModal(false);
      fetchRequests();
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  const getAllPendingMechanics = async () => {
    try {
      const { data } = await axios.get(
        "https://roadmateassist.onrender.com/api/admin/mechanic-requests"
      );
      setPendingMechanics(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching mechanics:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchUsers();
    fetchMechanics();
    getAllPendingMechanics();
  }, []);

  // top cards data from API
  const totalCompleted = requests.filter(
    (r) => r.status?.toLowerCase() === "completed"
  ).length;
  const totalInProgress = requests.filter(
    (r) => r.status?.toLowerCase() === "inprogress"
  ).length;
  const totalPending = requests.filter(
    (r) => r.status?.toLowerCase() === "pending"
  ).length;

  // Pie Chart Data
  const statusData = [
    { name: "Pending", value: totalPending },
    { name: "In Progress", value: totalInProgress },
    { name: "Completed", value: totalCompleted },
  ];

  // Custom Colors
  const COLORS = ["#CED46A", "#3B82F6", "#075538"];

  // Bar Chart Data
  const barData = [
    { name: "Requests", value: requests.length },
    { name: "Users", value: users.length },
    { name: "Mechanics", value: mechanics.length },
  ];

  //  Generate weekly progress data dynamically
  useEffect(() => {
    if (requests.length > 0) {
      const grouped = {};

      requests.forEach((req) => {
        const date = new Date(req.createdAt);
        const week = `Week ${Math.ceil(date.getDate() / 7)}`;

        if (!grouped[week]) {
          grouped[week] = {
            name: week,
            pending: 0,
            inProgress: 0,
            completed: 0,
          };
        }

        const status = req.status?.toLowerCase();
        if (status === "pending") grouped[week].pending += 1;
        if (status === "inprogress") grouped[week].inProgress += 1;
        if (status === "completed") grouped[week].completed += 1;
      });

      const formatted = Object.values(grouped).sort((a, b) => {
        const aNum = parseInt(a.name.replace("Week ", ""), 10);
        const bNum = parseInt(b.name.replace("Week ", ""), 10);
        return aNum - bNum;
      });

      setProgressData(formatted);
    }
  }, [requests]);

  return (
    <div className="p-4 mt-10 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#075538] mb-6 sm:mb-8">
        📊 Admin Dashboard
      </h1>

      {/* 🔹 Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6 mb-8">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow flex items-center gap-4">
          <ClipboardList className="text-[#075538] w-8 h-8 sm:w-10 sm:h-10" />
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-600">
              Total Requests
            </h3>
            <p className="text-xl sm:text-2xl font-bold text-[#075538]">
              {requests.length}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow flex items-center gap-4">
          <Users className="text-[#CED46A] w-8 h-8 sm:w-10 sm:h-10" />
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-600">
              Users
            </h3>
            <p className="text-xl sm:text-2xl font-bold text-[#075538]">
              {users.length}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow flex items-center gap-4">
          <Wrench className="text-[#075538] w-8 h-8 sm:w-10 sm:h-10" />
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-600">
              Mechanics
            </h3>
            <p className="text-xl sm:text-2xl font-bold text-[#075538]">
              {mechanics.length}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow flex items-center gap-4">
          <Clock className="text-[#CED46A] w-8 h-8 sm:w-10 sm:h-10" />
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-600">
              Pending
            </h3>
            <p className="text-xl sm:text-2xl font-bold text-[#075538]">
              {totalPending}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow flex items-center gap-4">
          <Clock className="text-[#075538] w-8 h-8 sm:w-10 sm:h-10" />
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-600">
              In Progress
            </h3>
            <p className="text-xl sm:text-2xl font-bold text-[#075538]">
              {totalInProgress}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow flex items-center gap-4">
          <CheckCircle className="text-[#CED46A] w-8 h-8 sm:w-10 sm:h-10" />
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-600">
              Completed
            </h3>
            <p className="text-xl sm:text-2xl font-bold text-[#075538]">
              {totalCompleted}
            </p>
          </div>
        </div>
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Bar Chart */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
          <h2 className="text-lg sm:text-xl font-bold mb-4 text-[#075538]">
            Overview
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#075538" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
          <h2 className="text-lg sm:text-xl font-bold mb-4 text-[#075538]">
            Requests Status
          </h2>
          <ResponsiveContainer width="100%" height={250}>
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

      {/* Line Chart */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow mb-8">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-[#075538]">
          Service Progress Trends
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pending"
              stroke="#CED46A"
              strokeWidth={2}
              name="Pending"
            />
            <Line
              type="monotone"
              dataKey="inProgress"
              stroke="#3B82F6"
              strokeWidth={2}
              name="In Progress"
            />
            <Line
              type="monotone"
              dataKey="completed"
              stroke="#075538"
              strokeWidth={2}
              name="Completed"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Requests Table */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold text-[#075538] mb-4">
          Recent Requests
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border rounded-lg overflow-hidden text-sm sm:text-base">
            <thead className="bg-[#CED46A] text-[#075538] sticky top-0">
              <tr>
                <th className="py-3 px-4 border">Type</th>
                <th className="py-3 px-4 border">Details</th>
                <th className="py-3 px-4 border">Status</th>
                <th className="py-3 px-4 border">Date</th>
                <th className="py-3 px-4 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.slice(0, 8).map((req) => (
                <tr
                  key={req._id}
                  className="hover:bg-[#CED46A]/20 transition duration-200"
                >
                  <td className="py-3 px-4 border">{req.requestType}</td>
                  <td className="py-3 px-4 border truncate max-w-[200px] sm:max-w-[300px]">
                    {req.details}
                  </td>
                  <td
                    className={`py-3 px-4 border font-semibold ${
                      req.status?.toLowerCase() === "pending"
                        ? "text-[#CED46A]"
                        : req.status?.toLowerCase() === "completed"
                        ? "text-[#075538]"
                        : "text-blue-600"
                    }`}
                  >
                    {req.status}
                  </td>
                  <td className="py-3 px-4 border whitespace-nowrap">
                    {new Date(req.createdAt).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 border text-center">
                    <button
                      onClick={() => handleView(req)}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(req)}
                      className="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No requests available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            {!isEditing ? (
              <>
                <h3 className="text-xl font-bold mb-4 text-[#075538]">
                  Request Details
                </h3>
                <p>
                  <strong>Type:</strong> {selectedRequest.requestType}
                </p>
                <p>
                  <strong>Details:</strong> {selectedRequest.details}
                </p>
                <p>
                  <strong>Status:</strong> {selectedRequest.status}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(selectedRequest.createdAt).toLocaleString()}
                </p>
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-4 text-[#075538]">
                  Edit Request
                </h3>
                <label className="block mb-2 font-semibold">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded mb-4"
                >
                  <option value="pending">Pending</option>
                  <option value="inProgress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>

                <label className="block mb-2 font-semibold">Serviced By</label>
                <input
                  type="text"
                  value={formData.servicedBy}
                  onChange={(e) =>
                    setFormData({ ...formData, servicedBy: e.target.value })
                  }
                  placeholder="Mechanic name"
                  className="w-full border px-3 py-2 rounded mb-4"
                />

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Save
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 🔹 Advanced Monitoring Section */}
      {/* 🔸 Combined Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Service Demand Mapping (Statistical Analysis) */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold text-[#075538] mb-4">
            Service Demand Mapping (Statistical)
          </h2>
          <p className="text-gray-700 mb-4">
            Statistical mapping of service types based on demand distribution.
          </p>

          {/* 🔸 Prepare data dynamically for chart */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={
                requests.length > 0
                  ? (() => {
                      const freq = {};
                      requests.forEach((r) => {
                        freq[r.requestType] = (freq[r.requestType] || 0) + 1;
                      });
                      return Object.entries(freq).map(([name, value]) => ({
                        name,
                        value,
                      }));
                    })()
                  : []
              }
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#075538" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <p className="text-gray-600 mt-4">
            The chart shows how service categories contribute to total workload,
            identifying areas with highest demand.
          </p>
        </div>

        {/* Service Performance Trend */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold text-[#075538] mb-4">
            Service Performance Comparison
          </h2>
          <p className="text-gray-700 mb-4">
            Comparing performance trends between pending, ongoing, and completed
            tasks over the month.
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pending"
                stroke="#CED46A"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="inProgress"
                stroke="#3B82F6"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#075538"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* 🔹 Verification Workflow for Mechanics (KYC) */}
      <div className="bg-white p-6 rounded-xl shadow mt-8">
        <h2 className="text-xl font-bold text-[#075538] mb-4">
          Verification Workflow for Mechanics (KYC)
        </h2>
        <p className="text-gray-700 mb-6">
          This section outlines the current verification process for mechanics —
          from registration to final approval — ensuring compliance and
          authenticity.
        </p>

        {/* Workflow Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-4 bg-[#CED46A]/10 border-l-4 border-[#CED46A] rounded-lg shadow-sm">
            <h4 className="font-semibold text-[#075538] mb-2">
              1️⃣ Registration
            </h4>
            <p className="text-gray-700 text-sm">
              Mechanic creates an account and submits basic personal details and
              contact info.
            </p>
          </div>

          <div className="p-4 bg-[#075538]/10 border-l-4 border-[#075538] rounded-lg shadow-sm">
            <h4 className="font-semibold text-[#075538] mb-2">
              2️⃣ Document Upload
            </h4>
            <p className="text-gray-700 text-sm">
              ID, license, and certification documents are uploaded for
              verification.
            </p>
          </div>

          <div className="p-4 bg-[#CED46A]/10 border-l-4 border-[#CED46A] rounded-lg shadow-sm">
            <h4 className="font-semibold text-[#075538] mb-2">
              3️⃣ Background Check
            </h4>
            <p className="text-gray-700 text-sm">
              Admin verifies identity and professional records for authenticity
              and compliance.
            </p>
          </div>

          <div className="p-4 bg-[#075538]/10 border-l-4 border-[#075538] rounded-lg shadow-sm">
            <h4 className="font-semibold text-[#075538] mb-2">
              4️⃣ Approval & Activation
            </h4>
            <p className="text-gray-700 text-sm">
              Once verified, the mechanic profile is activated and marked as
              “Verified”.
            </p>
          </div>
        </div>

        {/* 🔹 Summary Status Insight */}
        <div className="mt-8 bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-bold text-[#075538] mb-4">
            Summary Status Insight
          </h3>
          <div className="space-y-3 text-lg text-gray-700">
            <p>
              <span className="font-semibold text-[#075538]">
                Verified Mechanics:
              </span>{" "}
              <span className="ml-2 bg-[#E8F5E9] text-[#075538] font-bold px-3 py-1 rounded">
                {mechanics.length}
              </span>
            </p>
            <p>
              <span className="font-semibold text-[#075538]">
                Pending Verification:
              </span>{" "}
              <span className="ml-2 bg-[#FFF8E1] text-[#B68B00] font-bold px-3 py-1 rounded">
                {pendingMechanics.length}
              </span>
            </p>
            <p>
              <span className="font-semibold text-[#075538]">
                Rejected Applications:
              </span>{" "}
              <span className="ml-2 bg-[#FFEBEE] text-[#C62828] font-bold px-3 py-1 rounded">
                {mechanics.filter((m) => m.status === "rejected").length}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
