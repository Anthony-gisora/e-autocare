import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const counties = [
  "Baringo",
  "Bomet",
  "Bungoma",
  "Busia",
  "Elgeyo-Marakwet",
  "Embu",
  "Garissa",
  "Homa Bay",
  "Isiolo",
  "Kajiado",
  "Kakamega",
  "Kericho",
  "Kiambu",
  "Kilifi",
  "Kirinyaga",
  "Kisii",
  "Kisumu",
  "Kitui",
  "Kwale",
  "Laikipia",
  "Lamu",
  "Machakos",
  "Makueni",
  "Mandera",
  "Marsabit",
  "Meru",
  "Migori",
  "Mombasa",
  "Murang'a",
  "Nairobi",
  "Nakuru",
  "Nandi",
  "Narok",
  "Nyamira",
  "Nyandarua",
  "Nyeri",
  "Samburu",
  "Siaya",
  "Taita Taveta",
  "Tana River",
  "Tharaka-Nithi",
  "Trans Nzoia",
  "Turkana",
  "Uasin Gishu",
  "Vihiga",
  "Wajir",
  "West Pokot",
];

const MechanicRequest = () => {
  const { user } = useUser();
  const [county, setCounty] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    alert(
      "You'll receive your confirmation notification in your notifications, Keep checking"
    );
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#edf2f4] flex items-center justify-center px-4 py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-[#2b2d42] mb-6">
          Mechanic Registration Request
        </h2>

        <form
          className="space-y-6"
          onSubmit={() => {
            handleSubmit();
          }}
        >
          {/* First & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#2b2d42]">
                First Name
              </label>
              <input
                type="text"
                value={user.firstName}
                readOnly
                className="w-full mt-1 p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2b2d42]">
                Last Name
              </label>
              <input
                type="text"
                value={user.lastName}
                readOnly
                className="w-full mt-1 p-3 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#2b2d42]">
              Email
            </label>
            <input
              type="email"
              placeholder={`${user.firstName}@gmail.com`}
              className="w-full mt-1 p-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* Area of Expertise */}
          <div>
            <label className="block text-sm font-medium text-[#2b2d42]">
              What is your area of expertise? *
            </label>
            <textarea
              rows={3}
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-md resize-none"
              placeholder="e.g. Engine Repair, Diagnostics, Brake Systems..."
            ></textarea>
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-sm font-medium text-[#2b2d42]">
              What is your level of experience? *
            </label>
            <select
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-md"
            >
              <option value="">-- Select Level --</option>
              <option value="Basic">Basic</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Professional">Professional</option>
            </select>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-[#2b2d42]">
              Enter your primary phone number. *
            </label>
            <input
              type="tel"
              required
              placeholder="07XX XXX XXX"
              className="w-full mt-1 p-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* County */}
          <div>
            <label className="block text-sm font-medium text-[#2b2d42]">
              What’s your county of operation? *
            </label>
            <select
              value={county}
              onChange={(e) => setCounty(e.target.value)}
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-md"
            >
              <option value="">-- Select County --</option>
              {counties.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          {/* Sub-county (now just text input) */}
          <div>
            <label className="block text-sm font-medium text-[#2b2d42]">
              What’s your sub-county? *
            </label>
            <input
              type="text"
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-md"
              placeholder="Enter your sub-county"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#2b2d42] text-white font-semibold py-3 rounded-md hover:bg-[#1f2034] transition"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default MechanicRequest;
