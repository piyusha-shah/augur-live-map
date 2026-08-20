export interface Venue {
    id: string;
    name: string;
    center: { lat: number; lng: number };
    bounds: { north: number; south: number; east: number; west: number };
}

export type EventType =
    | "fight"
    | "unattended-object"
    | "crowd-density"
    | "unauthorised-access"
    | "medical-emergency";

export interface EventFilters {
    venueId: string | null;
    type: EventType | null;
    severity: Severity | null;
}

export type Severity = "low" | "medium" | "high" | "critical";

export interface DetectionEvent {
    id: string;
    venueId: string;
    timestamp: string; // ISO 8601 string, e.g. "2026-08-19T20:04:43.474Z"
    position: { lat: number; lng: number };
    type: EventType;
    severity: Severity;
}
