import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const URL_API = "http://https:/roadmateassist.onrender.com/api/auth/login";

const MechanicLogin = () => {
  const [personalNumber, setPersonalNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(URL_API, {
        personalNumber,
        password,
      });

      const mechanic = res.data;
      console.log(mechanic);

      // if (
      //   personalNumber !== mechanic.personalNumber ||
      //   password !== mechanic.password
      // ) {
      //   return console.log("invalid password or personalNumber");
      // }

      setLoading(false);
      navigate("/mechanicHome");
    } catch (err) {
      console.error("Login error:", err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#edf2f4] px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-[#2b2d42] text-center mb-6">
          Mechanic Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[#2b2d42] font-medium mb-1">
              Personal Number
            </label>
            <input
              type="text"
              value={personalNumber}
              required
              onChange={(e) => setPersonalNumber(e.target.value)}
              className="w-full px-4 py-3 border border-[#ccc] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2b2d42]"
              placeholder="e.g. MECH-00123"
            />
          </div>

          <div>
            <label className="block text-[#2b2d42] font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-[#ccc] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2b2d42]"
              placeholder="Enter your password"
            />
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md text-white font-semibold transition ${
              loading
                ? "bg-[#8d99ae] cursor-not-allowed"
                : "bg-[#2b2d42] hover:bg-[#1f2034]"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-[#8d99ae] mt-6">
          Don’t have a personal number?{" "}
          <button onClick={() => navigate("/mechReq/:user")}>
            <span className="text-[#2b2d42] underline font-medium">
              Register as Mechanic
            </span>
          </button>
        </p>
      </div>
    </div>
  );
};

export default MechanicLogin;
