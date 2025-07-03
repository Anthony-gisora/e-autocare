import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Red pin icon
const redIcon = new L.Icon({
  iconUrl:
    "https://chart.googleapis.com/chart?chst=d_map_pin_icon&chld=home|FF0000",
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [0, -35],
});

const FetchOnMove = ({ onFetch }) => {
  const map = useMapEvents({
    moveend: () => {
      const center = map.getCenter();
      onFetch(center.lat, center.lng);
    },
    zoomend: () => {
      const center = map.getCenter();
      onFetch(center.lat, center.lng);
    },
  });
  return null;
};

const FitBoundsOnLoad = ({ center, radius }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      const bounds = [
        [
          center[0] - radius / 111320,
          center[1] - radius / (111320 * Math.cos(center[0] * (Math.PI / 180))),
        ],
        [
          center[0] + radius / 111320,
          center[1] + radius / (111320 * Math.cos(center[0] * (Math.PI / 180))),
        ],
      ];
      map.fitBounds(bounds);
    }
  }, [center, radius, map]);
  return null;
};

const EAutoCareMap = ({ id = "123" }) => {
  const [position, setPosition] = useState(null);
  const [features, setFeatures] = useState([]);
  const [model, setModel] = useState("");
  const [issue, setIssue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const fetchedRef = useRef(false);

  const fetchFeatures = (lat, lon) => {
    const overpassQuery = `
      [out:json];
      (
        node["name"](around:500,${lat},${lon});
        way["name"](around:500,${lat},${lon});
        relation["name"](around:500,${lat},${lon});
        node["place"](around:500,${lat},${lon});
      );
      out center;
    `;
    fetch(
      `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
        overpassQuery
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        const points = data.elements.map((el) => {
          const lat = el.lat || el.center?.lat;
          const lon = el.lon || el.center?.lon;
          return {
            lat,
            lon,
            name: el.tags?.name || el.tags?.place || "Unnamed",
          };
        });
        setFeatures(points);
      })
      .catch((err) => console.error("Fetch failed:", err));
  };

  useEffect(() => {
    if (!fetchedRef.current) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = [pos.coords.latitude, pos.coords.longitude];
          setPosition(coords);
          fetchFeatures(coords[0], coords[1]);
          fetchedRef.current = true;
        },
        (err) => console.error(err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      alert(`Service requested for: ${model}\nIssue: ${issue}`);
      setSubmitting(false);
      setModel("");
      setIssue("");
    }, 1500);
  };

  const circleRadius = 125;

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left: Map */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full">
        {position && (
          <MapContainer
            center={position}
            zoom={18}
            maxZoom={20}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <FitBoundsOnLoad center={position} radius={500} />
            {/* <Circle
              center={position}
              radius={circleRadius}
              pathOptions={{
                fillColor: "#ff3333",
                color: "#cc0000",
                fillOpacity: 0.3,
              }}
            /> */}
            <Marker position={position}>
              <Popup>You are here</Popup>
            </Marker>
            {/* {features.map((item, index) => (
              <Marker key={index} position={[item.lat, item.lon]}>
                <Popup>{item.name}</Popup>
              </Marker>
            ))} */}
            <FetchOnMove onFetch={fetchFeatures} />
          </MapContainer>
        )}
      </div>

      {/* Right: Request Form */}
      <div className="w-full md:w-1/2 bg-[#edf2f4] p-6 flex items-center justify-center">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 space-y-6">
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

export default EAutoCareMap;
