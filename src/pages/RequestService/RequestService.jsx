// import { useParams } from "react-router-dom";

// const RequestService = () => {
//   const param = useParams();
//   const user = param.id;
//   return <div>{user}</div>;
// };

// export default RequestService;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icon (so it shows on modern builds)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const RequestService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [model, setModel] = useState("");
  const [issue, setIssue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [position, setPosition] = useState([0, 0]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      () => alert("Couldn't get your location."),
      { enableHighAccuracy: true }
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      alert(
        `Request sent to mechanic #${id}\nModel: ${model}\nIssue: ${issue}`
      );
      setSubmitting(false);
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#edf2f4] flex flex-col">
      {/* Top Section: Live Map */}
      <div className="h-64 md:h-96 w-full">
        <MapContainer
          center={position}
          zoom={16}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={position}>
            <Popup>You are here</Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Bottom Section: Form */}
      <div className="flex-1 w-full bg-gradient-to-t from-[#edf2f4] via-[#edf2f4]/80 to-transparent px-6 py-8">
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
          <h2 className="text-2xl font-bold text-[#2b2d42]">
            Request Service from Mechanic #{id}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#2b2d42] font-medium mb-1">
                Car Model
              </label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="e.g. Toyota Premio 2012"
                className="w-full p-3 border border-[#8d99ae] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2b2d42]"
                required
              />
            </div>

            <div>
              <label className="block text-[#2b2d42] font-medium mb-1">
                Brief Problem Description
              </label>
              <textarea
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                rows={4}
                placeholder="Describe what's wrong..."
                className="w-full p-3 border border-[#8d99ae] rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#2b2d42]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-3 rounded-md font-semibold text-white transition ${
                submitting
                  ? "bg-[#8d99ae] cursor-not-allowed"
                  : "bg-[#2b2d42] hover:bg-[#1f2034]"
              }`}
            >
              {submitting ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestService;
