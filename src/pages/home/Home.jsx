import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [showMechanics, setShowMechanics] = useState(false);
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRequestHelp = async () => {
    setShowMechanics(true);
    setLoading(true);

    try {
      // Fixed the url from localhost and used correct backend endpoint
      const res = await axios.get(
        "https://roadmateassist.onrender.com/api/admin/mechanics"
      );
      setMechanics(res.data);
    } catch (err) {
      console.error("Error fetching mechanics:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMechanicClick = (mechanicId) => {
    navigate(`/request-service/${mechanicId}`);
  };

  return (
    <div className="min-h-screen bg-[#edf2f4] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl text-center space-y-8">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#2b2d42] leading-tight">
          Your Car, Our Care – Anytime, Anywhere
        </h1>
        <p className="text-base md:text-lg text-[#2b2d42] font-medium leading-relaxed px-2 md:px-10">
          Stranded with a breakdown? Find a nearby, trusted mechanic and get
          help fast.
        </p>
        <button
          onClick={handleRequestHelp}
          disabled={loading}
          className="bg-[#2b2d42] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#1f2034] transition disabled:opacity-50"
        >
          {loading ? "Loading mechanics..." : "🔧 Request Help Now"}
        </button>

        {showMechanics && (
          <div className="bg-white rounded-xl shadow-lg p-5 mt-6 text-left space-y-4 mx-auto w-full max-w-md">
            <h2 className="text-xl md:text-2xl font-bold text-[#2b2d42]">
              Nearby Mechanics
            </h2>
            {loading ? (
              <p className="text-[#8d99ae]">Fetching mechanics...</p>
            ) : mechanics.length === 0 ? (
              <p className="text-[#8d99ae]">No mechanics found.</p>
            ) : (
              <ul className="space-y-4">
                {mechanics.map((mech) => (
                  <li
                    key={mech._id}
                    onClick={() => handleMechanicClick(mech.personalNumber)}
                    className="flex items-start gap-3 border-b pb-3 cursor-pointer hover:bg-[#f1f1f1] rounded-lg p-2 transition"
                  >
                    <span className="text-xl md:text-2xl text-[#8d99ae]">
                      📍
                    </span>
                    <div>
                      <p className="font-semibold text-[#2b2d42]">
                        {mech.name}
                      </p>
                      <p className="text-sm text-[#8d99ae]">
                        {mech.distance || "Distance unknown"}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
