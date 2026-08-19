import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import type { Venue, DetectionEvent, Severity } from "../types/api";

interface MapViewProps {
    venues: Venue[];
    events: DetectionEvent[];
}

const severityColor: Record<Severity, string> = {
    low: "#2e7d32",      // green
    medium: "#f9a825",   // amber
    high: "#ef6c00",     // orange
    critical: "#c62828", // red
};

export function MapView({ venues, events }: MapViewProps) {
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

            {events.map((event) => (
                <CircleMarker
                    key={event.id}
                    center={[event.position.lat, event.position.lng]}
                    radius={8}
                    pathOptions={{ color: severityColor[event.severity], fillOpacity: 0.7 }}
                >
                    <Popup>
                        <strong>{event.type}</strong>
                        <br />
                        Severity: {event.severity}
                        <br />
                        {new Date(event.timestamp).toLocaleTimeString()}
                    </Popup>
                </CircleMarker>
            ))}
        </MapContainer>
    );
}