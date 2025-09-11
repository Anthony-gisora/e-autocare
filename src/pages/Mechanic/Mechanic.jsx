import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

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

  const [email, setEmail] = useState(`${user.firstName}@gmail.com`);
  const [expertise, setExpertise] = useState("");
  const [experience, setExperience] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("Kenya");
  const [county, setCounty] = useState("");
  const [subCounty, setSubCounty] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Request submitted successfully!");

    // Clear form
    setEmail(`${user.firstName}@gmail.com`);
    setExpertise("");
    setExperience("");
    setPhone("");
    setCountry("Kenya");
    setCounty("");
    setSubCounty("");
  };

  return (
    <div className="min-h-screen bg-[#CED46A] flex items-center justify-center px-4 py-12">
      <Toaster position="top-center" />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl border-2 border-[#075538]">
        <h2 className="text-2xl font-bold text-[#075538] mb-6">
          Mechanic Registration Request
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#075538]">
                First Name
              </label>
              <input
                type="text"
                value={user.firstName}
                readOnly
                className="w-full mt-1 p-3 border border-[#075538] rounded-md bg-[#CED46A] text-[#075538]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#075538]">
                Last Name
              </label>
              <input
                type="text"
                value={user.lastName}
                readOnly
                className="w-full mt-1 p-3 border border-[#075538] rounded-md bg-[#CED46A] text-[#075538]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#075538]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 p-3 border border-[#075538] rounded-md bg-[#CED46A] text-[#075538]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#075538]">
              What is your area of expertise? *
            </label>
            <textarea
              rows={3}
              value={expertise}
              onChange={(e) => setExpertise(e.target.value)}
              required
              className="w-full mt-1 p-3 border border-[#075538] rounded-md bg-[#CED46A] text-[#075538] resize-none"
              placeholder="e.g. Engine Repair, Diagnostics, Brake Systems..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#075538]">
              What is your level of experience? *
            </label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
              className="w-full mt-1 p-3 border border-[#075538] rounded-md bg-[#CED46A] text-[#075538]"
            >
              <option value="">-- Select Level --</option>
              <option value="Basic">Basic</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Professional">Professional</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#075538]">
              Enter your primary phone number. *
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="07XX XXX XXX"
              className="w-full mt-1 p-3 border border-[#075538] rounded-md bg-[#CED46A] text-[#075538]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#075538]">
              What’s your country of operation? *
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="w-full mt-1 p-3 border border-[#075538] rounded-md bg-[#CED46A] text-[#075538]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#075538]">
              What’s your county of operation? *
            </label>
            <select
              value={county}
              onChange={(e) => setCounty(e.target.value)}
              required
              className="w-full mt-1 p-3 border border-[#075538] rounded-md bg-[#CED46A] text-[#075538]"
            >
              <option value="">-- Select County --</option>
              {counties.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#075538]">
              What’s your sub-county? *
            </label>
            <input
              type="text"
              value={subCounty}
              onChange={(e) => setSubCounty(e.target.value)}
              required
              placeholder="Enter your sub-county"
              className="w-full mt-1 p-3 border border-[#075538] rounded-md bg-[#CED46A] text-[#075538]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#075538] text-white font-semibold py-3 rounded-md hover:bg-[#05492f] transition"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default MechanicRequest;
