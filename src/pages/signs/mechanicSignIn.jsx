import { useState } from "react";
import { Mechanics } from "../../dammyData/datasets";
import { useNavigate } from "react-router-dom";

const MechanicLogin = () => {
  const [personalNumber, setPersonalNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    Mechanics.map((mechanic) => {
      if (
        personalNumber === mechanic.mechPersonalNumber &&
        password === mechanic.Password
      ) {
        setTimeout(() => {
          setPersonalNumber("");
          setPassword("");
          setLoading(false);
        }, 1500);

        navigate("/mechanicHome");

        return alert(`Logged in as: ${personalNumber}`);
      }
      setLoading(false);
    });

    // Simulate login
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
          <a
            href="/mechReq/:user"
            className="text-[#2b2d42] underline font-medium"
          >
            Register as Mechanic
          </a>
        </p>
      </div>
    </div>
  );
};

export default MechanicLogin;
