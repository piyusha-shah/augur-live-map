import { useEffect, useMemo, useState } from "react";
import { fetchVenues } from "./api/venue";
import { FilterPanel } from "./filter/FilterPanel";
import type { Venue, EventFilters } from "./types/api";
import { MapView } from "./map/MapView";
import { useEventStream } from "./hooks/useEventStream";

function App() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const { events, totalReceived, status } = useEventStream();
  const [filters, setFilters] = useState<EventFilters>({
    venueId: null,
    type: null,
    severity: null,
  });

  useEffect(() => {
    fetchVenues().then(setVenues);
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      if (filters.venueId && e.venueId !== filters.venueId) return false;
      if (filters.type && e.type !== filters.type) return false;
      if (filters.severity && e.severity !== filters.severity) return false;
      return true;
    });
  }, [events, filters]);

  return (
    <div>
      <FilterPanel venues={venues} filters={filters} onChange={setFilters} />
      <p>
        Stream status: {status} · Showing {filteredEvents.length} of {events.length} buffered ({totalReceived} received)
      </p>
      <MapView venues={venues} events={filteredEvents} />
    </div>
  );
}

export default App;
