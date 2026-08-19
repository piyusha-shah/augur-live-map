import { useEffect, useRef, useState } from "react";
import { API_BASE_URL } from "../api/client";
import type { DetectionEvent } from "../types/api";

export type ConnectionStatus = "connecting" | "open" | "reconnecting" | "error";

export function useEventStream() {
    const [events, setEvents] = useState<DetectionEvent[]>([]);
    const [status, setStatus] = useState<ConnectionStatus>("connecting");
    const hasConnectedOnceRef = useRef(false);

    useEffect(() => {
        const source = new EventSource(`${API_BASE_URL}/api/events/stream`);

        source.addEventListener("open", () => {
            setStatus("open");
            hasConnectedOnceRef.current = true;
        });

        source.addEventListener("detection", (e: MessageEvent) => {
            const newEvent: DetectionEvent = JSON.parse(e.data);
            setEvents((prev) => [newEvent, ...prev]);
        });

        source.addEventListener("error", () => {
            setStatus(hasConnectedOnceRef.current ? "reconnecting" : "error");
        });

        return () => {
            source.close();
        };
    }, []);

    return { events, status };
}
