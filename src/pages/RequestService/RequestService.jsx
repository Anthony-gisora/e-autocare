import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

// Default icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const EAutoCareMap = () => {
  const [position, setPosition] = useState([0, 0]);
  const [landmarks, setLandmarks] = useState([]);

  // Get user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setPosition(coords);

        // Fetch landmarks using Overpass API
        fetch(`https://overpass-api.de/api/interpreter?data=[out:json];(
          node["name"](around:1000,${coords[0]},${coords[1]});
          way["name"](around:1000,${coords[0]},${coords[1]});
        );out center;`)
          .then((res) => res.json())
          .then((data) => {
            const features = data.elements.map((el) => {
              const lat = el.lat || el.center?.lat;
              const lon = el.lon || el.center?.lon;
              return { lat, lon, name: el.tags?.name || "Unnamed" };
            });
            setLandmarks(features);
          });
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={position}
        zoom={17}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>

        {landmarks.map((place, i) => (
          <Marker key={i} position={[place.lat, place.lon]}>
            <Popup>{place.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default EAutoCareMap;
