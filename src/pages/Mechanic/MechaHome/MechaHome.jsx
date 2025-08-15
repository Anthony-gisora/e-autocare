import React, { useEffect, useState } from "react";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { io } from "socket.io-client";

const SOCKET_URI = "https://roadmateassist.onrender.com";

// Hardcoded mechanic location
const myInitialLocation = [-4.0435, 39.6682]; // Mombasa

// Hardcoded list of garages
const garages = [
  { id: 1, name: "Garage A", coords: [-4.05, 39.66] },
  { id: 2, name: "Garage B", coords: [-4.041, 39.67] },
  { id: 3, name: "Garage C", coords: [-4.0485, 39.665] },
];

// Haversine formula to calculate distance (in km)
const getDistance = (coord1, coord2) => {
  const R = 6371;
  const dLat = (coord2[0] - coord1[0]) * (Math.PI / 180);
  const dLon = (coord2[1] - coord1[1]) * (Math.PI / 180);
  const lat1 = coord1[0] * (Math.PI / 180);
  const lat2 = coord2[0] * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

const MechanicHome = () => {
  const [requests, setRequests] = useState([]);
  const [completedJobs, setCompletedJobs] = useState([]);
  const [myLocation] = useState(myInitialLocation);
  const [nearestGarage, setNearestGarage] = useState(null);
  const [mapCenter, setMapCenter] = useState(myInitialLocation);
  const [driverLocation, setDriverLocation] = useState(null);

  const fetchRequests = async () => {
    try {
      const { data } = await axios.get(
        "https://roadmateassist.onrender.com/api/notifications/reqNotification"
      );
      setRequests(data.filter((req) => req.status === "pending"));
      setCompletedJobs(data.filter((req) => req.status === "completed"));
    } catch (error) {
      console.error("❌ Error fetching requests:", error);
    }
  };

  const updateStatus = async (id) => {
    try {
      await axios.put(
        `https://roadmateassist.onrender.com/api/req/update-status/${id}`
      );
      fetchRequests();
    } catch (error) {
      console.error("❌ Error updating status:", error);
    }
  };

  useEffect(() => {
    setMapCenter(myLocation);
    fetchRequests();

    // Find nearest garage
    let closest = garages[0];
    let minDistance = getDistance(myLocation, garages[0].coords);

    garages.forEach((g) => {
      const dist = getDistance(myLocation, g.coords);
      if (dist < minDistance) {
        minDistance = dist;
        closest = g;
      }
    });

    setNearestGarage(closest);

    // Socket connection
    const socket = io(SOCKET_URI, {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("✅ Connected to socket server");
      // Listen for driver location updates
      socket.on("driverLocationUpdate", (data) => {
        console.log(data);
        if (data?.lat && data?.lng) {
          setDriverLocation([data.lat, data.lng]);
        }
      });
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from socket server");
    });

    return () => {
      socket.disconnect();
    };
  }, [myLocation]);

  // Routing Control Component
  const RoutingControl = ({ from, to }) => {
    const map = useMap();

    useEffect(() => {
      if (!from || !to) return;

      const routing = L.Routing.control({
        waypoints: [L.latLng(from[0], from[1]), L.latLng(to[0], to[1])],
        routeWhileDragging: false,
        showAlternatives: false,
        addWaypoints: false,
        draggableWaypoints: false,
        lineOptions: {
          styles: [{ color: "red", weight: 5 }],
        },
      }).addTo(map);

      return () => map.removeControl(routing);
    }, [from, to, map]);

    return null;
  };

  // Map Icons
  const myIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  const garageIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854866.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  const driverIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1946/1946776.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  return (
    <div className="p-4 space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-500 text-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold">Completed Jobs</h3>
          <p className="text-2xl">{completedJobs.length}</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold">Active Requests</h3>
          <p className="text-2xl">{requests.length}</p>
        </div>
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold">Ratings</h3>
          <p className="text-2xl">4.8 ★</p>
        </div>
      </div>

      {/* Map */}
      <div className="h-96 rounded-lg overflow-hidden shadow">
        <MapContainer
          center={mapCenter}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* My Location */}
          <Marker position={myLocation} icon={myIcon}>
            <Popup>You are here</Popup>
          </Marker>
          <Circle center={myLocation} radius={50} color="green" />

          {/* Driver Location */}
          {driverLocation && (
            <>
              <Marker position={driverLocation} icon={driverIcon}>
                <Popup>Driver Location</Popup>
              </Marker>

              {/* Road-based route */}
              <RoutingControl from={myLocation} to={driverLocation} />
            </>
          )}
        </MapContainer>
      </div>

      {/* Coordinates Display */}
      <div className="bg-white p-4 rounded-lg shadow space-y-2">
        <p>
          <strong>My Location:</strong> {myLocation[0]}, {myLocation[1]}
        </p>
        {nearestGarage && (
          <p>
            <strong>Nearest Garage:</strong> {nearestGarage.coords[0]},{" "}
            {nearestGarage.coords[1]} ({nearestGarage.name})
          </p>
        )}
        {driverLocation && (
          <p>
            <strong>Driver Location:</strong> {driverLocation[0]},{" "}
            {driverLocation[1]}
          </p>
        )}
      </div>

      {/* Requests */}
      <div>
        <h2 className="text-xl font-bold mb-2">Recent Requests (Pending)</h2>
        <div className="space-y-2">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{req.requestType}</p>
                <p className="text-sm text-gray-600">{req.details}</p>
                <p className="text-xs text-gray-400">
                  {new Date(req.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => updateStatus(req._id)}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
              >
                Mark InProgress
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Jobs */}
      <div>
        <h2 className="text-xl font-bold mb-2">Completed Jobs</h2>
        <div className="space-y-2">
          {completedJobs.map((job) => (
            <div key={job._id} className="bg-gray-100 p-4 rounded-lg shadow">
              <p className="font-semibold">{job.requestType}</p>
              <p className="text-sm text-gray-600">{job.details}</p>
              <p className="text-xs text-gray-400">
                {new Date(job.updatedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MechanicHome;
