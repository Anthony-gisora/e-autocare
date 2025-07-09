import { useUser } from "@clerk/clerk-react";
import { useState } from "react";

const MechanicHome = () => {
  const { user } = useUser();

  const [jobsCompleted] = useState(24);
  const [activeRequests] = useState(3);
  const [rating] = useState(4.7);

  const recentRequests = [
    {
      id: 1,
      model: "Toyota Premio 2012",
      issue: "Engine overheating frequently...",
      date: "2025-07-03",
      customer: "Brian Otieno",
    },
    {
      id: 2,
      model: "Mazda Demio",
      issue: "Brake pedal feels too soft...",
      date: "2025-07-02",
      customer: "Faith Muthoni",
    },
    {
      id: 3,
      model: "Nissan Note",
      issue: "Won't start in the morning...",
      date: "2025-07-01",
      customer: "Kevin Kimani",
    },
    {
      id: 4,
      model: "Nissan Note",
      issue: "Break fluid burst...",
      date: "2025-07-01",
      customer: "Cynthia Akinyi",
    },
  ];

  return (
    <div className="min-h-screen bg-[#edf2f4] py-10 px-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-[#2b2d42] mb-2">
          Welcome back, {user.firstName}!
        </h1>
        <p className="text-[#8d99ae] text-lg">Here’s your latest dashboard</p>
      </div>

      {/* Stats */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-xl font-semibold text-[#2b2d42]">
            Jobs Completed
          </h2>
          <p className="text-3xl font-bold text-[#ef233c] mt-2">
            {jobsCompleted}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-xl font-semibold text-[#2b2d42]">
            Active Requests
          </h2>
          <p className="text-3xl font-bold text-[#f77f00] mt-2">
            {activeRequests}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-xl font-semibold text-[#2b2d42]">
            Average Rating
          </h2>
          <p className="text-3xl font-bold text-[#00b894] mt-2">{rating} ⭐</p>
        </div>
      </div>

      {/* Availability Toggle */}
      <div className="max-w-5xl mx-auto mt-10 text-center">
        <label className="inline-flex items-center space-x-3">
          <span className="text-[#2b2d42] font-medium">Available for Jobs</span>
          <input type="checkbox" className="toggle toggle-md" />
        </label>
      </div>

      {/* Recent Requests */}
      <div className="max-w-5xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-[#2b2d42] mb-4">
          Recent Requests
        </h2>
        <div className="bg-white rounded-lg shadow p-4 space-y-4">
          {recentRequests.map((req) => (
            <div
              key={req.id}
              className="border-b pb-4 last:border-none last:pb-0 space-y-1"
            >
              <h3 className="text-lg font-semibold text-[#2b2d42]">
                {req.model}
              </h3>
              <p className="text-sm text-[#8d99ae] italic">"{req.issue}"</p>
              <p className="text-sm text-[#2b2d42]">
                Client: <span className="font-medium">{req.customer}</span>
              </p>
              <p className="text-xs text-[#adb5bd]">Date: {req.date}</p>
              <button className="mt-2 bg-[#2b2d42] text-white px-4 py-2 rounded-lg hover:bg-[#1f2034] transition">
                Start Job
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MechanicHome;
