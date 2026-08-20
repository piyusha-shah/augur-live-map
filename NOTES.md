# Notes

## What's implemented

- Loads venues from GET /api/venues
- Subscribes to the live SSE stream and plots events on a Leaflet map, color-coded by severity
- Filters by venue, event type, and severity
- Handles loading, error (with retry), empty, and stream disconnect/reconnect states

## Key decisions and trade-offs

**SSE + named events**: the stream sends `event: detection` messages, so the client
listens via `addEventListener("detection", ...)` rather than the default `onmessage`,
which would silently receive nothing.

**Reconnect handling**: `EventSource` retries automatically under the hood; the app
tracks connection status (connecting/open/reconnecting/error) and reflects it in the
UI, rather than implementing manual retry logic on top of what the browser already does. (Verified that by disconnecting the WIFI)

**Client-side filtering**: filters are applied to the buffered event list in memory,
rather than reconnecting the SSE stream with query params per filter change.

**Bounded event buffer**: the live event list is capped at 200 most-recent events,
since the stream never stops. (Verified this works by tracking two counters, a
"total received" count that keeps rising forever, and the buffered count, which
climbs to 200 and then holds steady as older events get dropped for new ones.)

**Map library**: Leaflet with OpenStreetMap tiles — a free, no-API-key option for a scoped task.

## What I'd do with more time

- The analytics stretch view (GET /api/events range query).
- Compute the map's initial center/zoom from venue bounds (`fitBounds`) instead of a hardcoded London-centered fallback
- Basic component/hook tests, particularly around the SSE reconnect logic
- A paid tile provider (e.g. Mapbox, MapTiler) instead  for better reliability and usage limits in production.