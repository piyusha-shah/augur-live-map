# Augur live detection events map

Live map of detection events across venues, built with React + TypeScript.

## Running it

- `npm install`
- `npm run dev`

## What's implemented

- Loads venues from GET /api/venues
- Subscribes to the live SSE stream and plots events on a Leaflet map, color-coded by severity
- Filters by venue, event type, and severity
- Handles loading, error (with retry), empty, and stream disconnect/reconnect states