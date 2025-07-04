const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#2b2d42] animate-fadeUp">
      {/* Hero */}
      <section className="bg-[#2b2d42] text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">About E-AutoCare</h1>
        <p className="max-w-2xl mx-auto text-lg">
          Your roadside hero — connecting drivers to real-time, verified
          mechanics wherever the journey leads.
        </p>
      </section>

      {/* Core Services */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">What We Offer</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "On-Demand Mechanics",
              text: "Instant access to reliable, rated mechanics nearby.",
            },
            {
              title: "Smart Location Assistance",
              text: "Live map suggestions for garages, streets, and services.",
            },
            {
              title: "Digital Service Records",
              text: "Track your requests and vehicle history all in one place.",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-600 mb-4">{card.text}</p>
              <div className="w-16 h-1 mx-auto bg-[#2b2d42] rounded-full" />
            </div>
          ))}
        </div>
      </section>

      {/* Team Members */}
      <section className="py-12 px-4 bg-white max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Meet the Team</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {[
            { name: "Tonny G", role: "Lead Engineer", img: "/tonny.jpg" },
            { name: "Maria O.", role: "UX Designer", img: "/maria.jpg" },
            { name: "Kelvin R.", role: "Field Ops", img: "/kelvin.jpg" },
          ].map((member, i) => (
            <div
              key={i}
              className="bg-[#edf2f4] rounded-xl p-6 text-center shadow-md"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
              />
              <h4 className="text-xl font-semibold">{member.name}</h4>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 px-4 bg-[#f1f1f1] text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="italic text-gray-700">
              “E-AutoCare saved my road trip! Found a mechanic in minutes.”
            </p>
            <p className="mt-4 font-semibold">— James K., Nairobi</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="italic text-gray-700">
              “Finally, a map-based tool that works and feels smooth!”
            </p>
            <p className="mt-4 font-semibold">— Anita M., Kisumu</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-10 bg-[#eaeaea] text-center">
        <h3 className="text-2xl font-semibold mb-2">Need a mechanic now?</h3>
        <p className="text-gray-700 mb-4">
          Use the E-AutoCare map to request real-time help near you.
        </p>
        <a
          href="/"
          className="inline-block bg-[#2b2d42] text-white px-6 py-3 rounded-md hover:bg-[#1f2034] transition"
        >
          Go to Map
        </a>
      </section>

      {/* Animation styles */}
      <style>{`
        .animate-fadeUp {
          animation: fadeUp 0.6s ease-out;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AboutUs;
