import type { Venue, EventFilters, EventType, Severity } from "../types/api";

const EVENT_TYPES: EventType[] = [
    "fight",
    "unattended-object",
    "crowd-density",
    "unauthorised-access",
    "medical-emergency",
];

const SEVERITIES: Severity[] = ["low", "medium", "high", "critical"];

interface FilterPanelProps {
    venues: Venue[];
    filters: EventFilters;
    onChange: (filters: EventFilters) => void;
}

export function FilterPanel({ venues, filters, onChange }: FilterPanelProps) {
    return (
        <div style={{ display: "flex", gap: "12px" }}>
            <select
                value={filters.venueId ?? ""}
                onChange={(e) => onChange({ ...filters, venueId: e.target.value || null })}
            >
                <option value="">All venues</option>
                {venues.map((v) => (
                    <option key={v.id} value={v.id}>{v.name}</option>
                ))}
            </select>

            <select
                value={filters.type ?? ""}
                onChange={(e) => onChange({ ...filters, type: (e.target.value || null) as EventType | null })}
            >
                <option value="">All types</option>
                {EVENT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                ))}
            </select>

            <select
                value={filters.severity ?? ""}
                onChange={(e) => onChange({ ...filters, severity: (e.target.value || null) as Severity | null })}
            >
                <option value="">All severities</option>
                {SEVERITIES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                ))}
            </select>
        </div>
    );
}
