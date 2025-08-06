import { useEffect, useState, useRef } from "react";
import axios from "axios";
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
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";
import { useUser } from "@clerk/clerk-react";

const REQ_URI = "https://roadmateassist.onrender.com/api/req/requests";

const SearchControl = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const geocoder = L.Control.geocoder({
      defaultMarkGeocode: true,
      placeholder: "Search location...",
      position: "topright",
    })
      .on("markgeocode", function (e) {
        const bbox = e.geocode.bbox;
        const bounds = [
          [bbox.getSouth(), bbox.getWest()],
          [bbox.getNorth(), bbox.getEast()],
        ];
        map.fitBounds(bounds);
      })
      .addTo(map);

    return () => map.removeControl(geocoder);
  }, [map]);

  return null;
};

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

const RequestService = ({ id = "123" }) => {
  const { user, isLoaded } = useUser();
  const [position, setPosition] = useState(null);
  const [requestType, setRequestType] = useState("");
  const [issue, setIssue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [locationInfo, setLocationInfo] = useState("");
  const fetchedRef = useRef(false);

  const reqData = {
    driverId: user.id,
    requestType: requestType,
    details: issue,
  };

  const profileIcon = L.divIcon({
    className: "custom-avatar-icon",
    html: `
      <div class='flex flex-col items-center'>
        <img src='${user?.imageUrl}' class='w-10 h-10 rounded-full border-2 border-white shadow-md object-cover' />
        <div class='w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#2b2d42] mt-[-2px]'></div>
      </div>
    `,
    iconSize: [50, 60],
    iconAnchor: [25, 60],
    popupAnchor: [0, -60],
  });

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

        const named = points.find((p) => p.name !== "Unnamed");
        if (named) setLocationInfo(named.name);
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
      alert(`Service requested for: ${requestType}\nIssue: ${issue}`);
      setSubmitting(false);
      axios.post(REQ_URI, reqData).then((resp) => console.log(resp));
    }, 1500);
  };

  const circleRadius = 125;

  if (!isLoaded) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="relative h-screen w-full">
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
          <Circle
            center={position}
            radius={circleRadius}
            pathOptions={{
              fillColor: "#ff3333",
              color: "#cc0000",
              fillOpacity: 0.3,
            }}
          />
          <Marker position={position} icon={profileIcon}>
            <Popup>You are here {user.firstName}</Popup>
          </Marker>
          <FetchOnMove onFetch={fetchFeatures} />
          <SearchControl />
        </MapContainer>
      )}

      {/* Location Info */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md shadow-md rounded-md px-4 py-2 z-[1000]">
        <p className="text-sm text-[#2b2d42] font-medium">
          Current area: {locationInfo || "Detecting..."}
        </p>
      </div>

      {/* Bottom Form */}
      <div className="absolute bottom-0 left-0 w-full z-[1000]">
        <div className="bg-white/80 backdrop-blur-md max-w-xl mx-auto m-4 p-6 rounded-xl shadow-xl space-y-6 animate-slideUp">
          <h2 className="text-2xl font-bold text-[#2b2d42]">
            Request Service from Mechanic #{id}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#2b2d42] font-medium mb-1">
                Car requestType
              </label>
              <select
                value={requestType}
                onChange={(e) => setRequestType(e.target.value)}
                className="w-full p-3 border border-[#8d99ae] rounded-md"
                required
              >
                <option value="tow">Tow</option>
                <option value="maintenance">Maintenance</option>
                <option value="emergency">Emergency</option>
              </select>
            </div>
            <div>
              <label className="block text-[#2b2d42] font-medium mb-1">
                Brief Problem Description
              </label>
              <textarea
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                rows={3}
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

      <style>{`
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default RequestService;
