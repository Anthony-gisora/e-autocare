import React, { useState } from "react";

// for testing will delete after ...
const mechanics = [
  { id: 1, name: "Joe's AutoFix", distance: "0.5 km away" },
  { id: 2, name: "Speedy Garage", distance: "1.2 km away" },
  { id: 3, name: "MekaniQ Hub", distance: "2.0 km away" },
];

export default function LandingPage() {
  const [showMechanics, setShowMechanics] = useState(false);

  return (
    <div className="min-h-screen bg-[#edf2f4] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl text-center space-y-8">
        {/* Hero Text */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#075538] leading-tight">
          Your Car, Our Care – Anytime, Anywhere
        </h1>
        <p className="text-base md:text-lg text-[#075538] font-medium leading-relaxed px-2 md:px-10">
          Stranded with a breakdown? Find a nearby, trusted mechanic and get
          help fast.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => setShowMechanics(true)}
          className="bg-[#075538] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#05432d] transition"
        >
          🔧 Request Help Now
        </button>

        {/* Mechanics List */}
        {showMechanics && (
          <div className="bg-white rounded-xl shadow-lg p-5 mt-6 text-left space-y-4 mx-auto w-full max-w-md border-t-4 border-[#CED46A]">
            <h2 className="text-xl md:text-2xl font-bold text-[#075538]">
              Nearby Mechanics
            </h2>
            <ul className="space-y-4">
              {mechanics.map((mech) => (
                <li
                  key={mech.id}
                  className="flex items-start gap-3 border-b pb-3"
                >
                  <span className="text-xl md:text-2xl text-[#CED46A]">📍</span>
                  <div>
                    <p className="font-semibold text-[#075538]">{mech.name}</p>
                    <p className="text-sm text-gray-600">{mech.distance}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
