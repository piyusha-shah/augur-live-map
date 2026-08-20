import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from "react-leaflet";
import L from "leaflet";
import type { Venue, DetectionEvent, Severity } from "../types/api";

interface MapViewProps {
    venues: Venue[];
    events: DetectionEvent[];
}

const severityColor: Record<Severity, string> = {
    low: "#2e7d32",
    medium: "#f9a825",
    high: "#ef6c00",
    critical: "#c62828",
};

function FitToVenues({ venues }: { venues: Venue[] }) {
    const map = useMap();

    useEffect(() => {
        if (venues.length === 0) return;
        const bounds = L.latLngBounds(
            venues.flatMap((v) => [
                [v.bounds.north, v.bounds.east],
                [v.bounds.south, v.bounds.west],
            ] as [number, number][])
        );
        map.fitBounds(bounds, { padding: [40, 40] });
    }, [venues, map]);

    return null;
}

export function MapView({ venues, events }: MapViewProps) {
    const fallbackCenter: [number, number] = [51.51, -0.15];

    return (
        <MapContainer center={fallbackCenter} zoom={11} style={{ height: "500px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />

            <FitToVenues venues={venues} />

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
