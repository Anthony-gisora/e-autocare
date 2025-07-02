import React, { useState } from "react";

const mechanics = [
  { id: 1, name: "Joe's AutoFix", distance: "0.5 km away" },
  { id: 2, name: "Speedy Garage", distance: "1.2 km away" },
  { id: 3, name: "MekaniQ Hub", distance: "2.0 km away" },
];

const Home = () => {
  const [showMechanics, setShowMechanics] = useState(false);

  const handleRequestHelp = () => {
    setShowMechanics(true);
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
          className="bg-[#2b2d42] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#1f2034] transition"
        >
          🔧 Request Help Now
        </button>

        {showMechanics && (
          <div className="bg-white rounded-xl shadow-lg p-5 mt-6 text-left space-y-4 mx-auto w-full max-w-md">
            <h2 className="text-xl md:text-2xl font-bold text-[#2b2d42]">
              Nearby Mechanics
            </h2>
            <ul className="space-y-4">
              {mechanics.map((mech) => (
                <li
                  key={mech.id}
                  className="flex items-start gap-3 border-b pb-3"
                >
                  <span className="text-xl md:text-2xl text-[#8d99ae]">📍</span>
                  <div>
                    <p className="font-semibold text-[#2b2d42]">{mech.name}</p>
                    <p className="text-sm text-[#8d99ae]">{mech.distance}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
