import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { Venue } from "../types/api";

interface MapViewProps {
    venues: Venue[];
}

export function MapView({ venues }: MapViewProps) {
    // London roughly centers all 5 venues; fine as a fixed starting view
    const initialCenter: [number, number] = [51.51, -0.15];

    return (
        <MapContainer center={initialCenter} zoom={11} style={{ height: "500px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            {venues.map((venue) => (
                <Marker key={venue.id} position={[venue.center.lat, venue.center.lng]}>
                    <Popup>{venue.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}