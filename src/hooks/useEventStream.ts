import { useEffect, useRef, useState } from "react";
import { API_BASE_URL } from "../api/client";
import type { DetectionEvent } from "../types/api";

export type ConnectionStatus = "connecting" | "open" | "reconnecting" | "error";

export function useEventStream() {
    const [events, setEvents] = useState<DetectionEvent[]>([]);
    const [totalReceived, setTotalReceived] = useState(0);

    const [status, setStatus] = useState<ConnectionStatus>("connecting");
    const hasConnectedOnceRef = useRef(false);

    useEffect(() => {
        const source = new EventSource(`${API_BASE_URL}/api/events/stream`);
        const MAX_EVENTS = 200;

        source.addEventListener("open", () => {
            setStatus("open");
            hasConnectedOnceRef.current = true;
        });

        source.addEventListener("detection", (e: MessageEvent) => {
            const newEvent: DetectionEvent = JSON.parse(e.data);
            setEvents((prev) => [newEvent, ...prev].slice(0, MAX_EVENTS));
            setTotalReceived((prev) => prev + 1);
        });

        source.addEventListener("error", () => {
            setStatus(hasConnectedOnceRef.current ? "reconnecting" : "error");
        });

        return () => {
            source.close();
        };
    }, []);

    return { events, totalReceived, status };
}
