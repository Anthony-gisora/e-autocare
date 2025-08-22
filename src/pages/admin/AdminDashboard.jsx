// import { useEffect, useState } from "react";
// import axios from "axios";

// const API_URL =
//   "https://roadmateassist.onrender.com/api/admin/mechanic-requests";

// const AdminDashboard = () => {
//   const [requests, setRequests] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     personalNumber: "",
//     experience: "",
//     skills: "",
//   });
//   const [filter, setFilter] = useState("");
//   const [modalData, setModalData] = useState(null);

//   const loadRequests = async () => {
//     try {
//       const res = await axios.get(API_URL);
//       setRequests(res.data);
//     } catch (err) {
//       console.error("Failed to load requests:", err);
//     }
//   };

//   useEffect(() => {
//     loadRequests();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = {
//       ...form,
//       experience: parseInt(form.experience) || 0,
//       skills: form.skills.split(",").map((s) => s.trim()),
//     };

//     try {
//       await axios.post(API_URL, payload);
//       setForm({ name: "", personalNumber: "", experience: "", skills: "" });
//       loadRequests();
//     } catch (err) {
//       console.error("Failed to submit:", err);
//     }
//   };

//   const updateStatus = async (id, status) => {
//     try {
//       await axios.patch(`${API_URL}/${id}`, { status });
//       loadRequests();
//     } catch (err) {
//       console.error("Status update failed:", err);
//     }
//   };

//   const filteredRequests = requests.filter((r) =>
//     r.name.toLowerCase().includes(filter.toLowerCase())
//   );

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-white shadow mt-6 rounded">
//       <h2 className="text-2xl font-bold text-center mb-4">
//         🛠️ Mechanic Registration Admin Panel
//       </h2>

//       <input
//         type="text"
//         placeholder="Search by name..."
//         className="mb-4 w-full border p-2 rounded"
//         value={filter}
//         onChange={(e) => setFilter(e.target.value)}
//       />

//       <form
//         onSubmit={handleSubmit}
//         className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
//       >
//         <input
//           type="text"
//           id="name"
//           value={form.name}
//           onChange={handleChange}
//           placeholder="Name"
//           required
//           className="border p-2 rounded"
//         />
//         <input
//           type="text"
//           id="personalNumber"
//           value={form.personalNumber}
//           onChange={handleChange}
//           placeholder="Personal Number"
//           required
//           className="border p-2 rounded"
//         />
//         <input
//           type="number"
//           id="experience"
//           value={form.experience}
//           onChange={handleChange}
//           placeholder="Experience (Years)"
//           className="border p-2 rounded"
//         />
//         <input
//           type="text"
//           id="skills"
//           value={form.skills}
//           onChange={handleChange}
//           placeholder="Skills (comma-separated)"
//           className="border p-2 rounded col-span-2"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Submit
//         </button>
//       </form>

//       <div className="overflow-x-auto">
//         <table className="w-full border text-sm table-auto">
//           <thead>
//             <tr className="bg-gray-200 text-left">
//               <th className="p-2 border">Name</th>
//               <th className="p-2 border">Personal No.</th>
//               <th className="p-2 border">Experience</th>
//               <th className="p-2 border">Status</th>
//               <th className="p-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredRequests.map((r) => (
//               <tr key={r._id} className="hover:bg-gray-100">
//                 <td className="p-2 border">{r.name}</td>
//                 <td className="p-2 border">{r.personalNumber}</td>
//                 <td className="p-2 border">{r.experience} yrs</td>
//                 <td className="p-2 border">{r.status}</td>
//                 <td className="p-2 border flex flex-wrap gap-2">
//                   <button
//                     onClick={() => setModalData(r)}
//                     className="px-2 py-1 bg-gray-200 rounded"
//                   >
//                     View
//                   </button>
//                   <button
//                     onClick={() => updateStatus(r._id, "approved")}
//                     className="px-2 py-1 bg-green-600 text-white rounded"
//                   >
//                     Approve
//                   </button>
//                   <button
//                     onClick={() => updateStatus(r._id, "rejected")}
//                     className="px-2 py-1 bg-red-600 text-white rounded"
//                   >
//                     Reject
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {modalData && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded shadow-lg w-96 relative">
//             <button
//               onClick={() => setModalData(null)}
//               className="absolute top-2 right-3 text-xl text-gray-500"
//             >
//               &times;
//             </button>
//             <h3 className="text-xl font-bold mb-3">Mechanic Details</h3>
//             <p>
//               <strong>Name:</strong> {modalData.name}
//             </p>
//             <p>
//               <strong>Personal No.:</strong> {modalData.personalNumber}
//             </p>
//             <p>
//               <strong>Experience:</strong> {modalData.experience} years
//             </p>
//             <p>
//               <strong>Skills:</strong> {modalData.skills.join(", ")}
//             </p>
//             <p>
//               <strong>Status:</strong> {modalData.status}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { MapContainer, TileLayer, Marker, Circle, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [driverLocations, setDriverLocations] = useState({});
  const socket = io("https://roadmateassist.onrender.com");

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

    socket.on("driverLocationUpdate", ({ driverId, latitude, longitude }) => {
      console.log("📍 Driver location update:", driverId, latitude, longitude);
      setDriverLocations((prev) => ({
        ...prev,
        [driverId]: { latitude, longitude },
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Custom marker
  const markerIcon = new L.Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const totalCompleted = requests.filter(
    (r) => r.status === "completed"
  ).length;
  const totalInProgress = requests.filter(
    (r) => r.status === "inProgress"
  ).length;
  const totalPending = requests.filter((r) => r.status === "pending").length;

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Requests</h3>
          <p className="text-2xl">{requests.length}</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Pending</h3>
          <p className="text-2xl">{totalPending}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">In Progress</h3>
          <p className="text-2xl">{totalInProgress}</p>
        </div>
        <div className="bg-purple-500 text-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Completed</h3>
          <p className="text-2xl">{totalCompleted}</p>
        </div>
        <div className="bg-indigo-500 text-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Users</h3>
          <p className="text-2xl">{users.length}</p>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Mechanics</h3>
          <p className="text-2xl">{mechanics.length}</p>
        </div>
      </div>

      {/* Map with Drivers */}
      <div className="h-96 rounded-lg overflow-hidden shadow">
        <MapContainer
          center={[1.2921, 36.8219]}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {Object.entries(driverLocations).map(([id, loc]) => (
            <React.Fragment key={id}>
              <Marker
                position={[loc.latitude, loc.longitude]}
                icon={markerIcon}
              >
                <Popup>Driver: {id}</Popup>
              </Marker>
              <Circle
                center={[loc.latitude, loc.longitude]}
                radius={100}
                color="red"
              />
            </React.Fragment>
          ))}
        </MapContainer>
      </div>

      {/* Recent Requests Table */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-3">Recent Requests</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-3 border">Type</th>
                <th className="py-2 px-3 border">Details</th>
                <th className="py-2 px-3 border">Status</th>
                <th className="py-2 px-3 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {requests.slice(0, 10).map((req) => (
                <tr key={req._id} className="hover:bg-gray-100">
                  <td className="py-2 px-3 border">{req.requestType}</td>
                  <td className="py-2 px-3 border">{req.details}</td>
                  <td
                    className={`py-2 px-3 border font-semibold ${
                      req.status === "pending"
                        ? "text-yellow-500"
                        : req.status === "completed"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  >
                    {req.status}
                  </td>
                  <td className="py-2 px-3 border">
                    {new Date(req.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
