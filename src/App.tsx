import { useEffect, useMemo, useState } from "react";
import type { Venue, EventFilters } from "./types/api";
import { MapView } from "./map/MapView";
import { useEventStream } from "./hooks/useEventStream";
import { fetchVenues } from "./api/venue";
import { FilterPanel } from "./filter/FilterPanel";

function App() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [venuesLoading, setVenuesLoading] = useState(true);
  const [venuesError, setVenuesError] = useState<string | null>(null);
  const { events, status } = useEventStream();
  const [filters, setFilters] = useState<EventFilters>({
    venueId: null,
    type: null,
    severity: null,
  });

  const loadVenues = () => {
    setVenuesLoading(true);
    setVenuesError(null);
    fetchVenues()
      .then(setVenues)
      .catch((err) => setVenuesError(err.message))
      .finally(() => setVenuesLoading(false));
  };

  useEffect(() => {
    loadVenues();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      if (filters.venueId && e.venueId !== filters.venueId) return false;
      if (filters.type && e.type !== filters.type) return false;
      if (filters.severity && e.severity !== filters.severity) return false;
      return true;
    });
  }, [events, filters]);

  if (venuesLoading) return <p>Loading venues…</p>;

  if (venuesError) {
    return (
      <div>
        <p>Couldn't load venues: {venuesError}</p>
        <button onClick={loadVenues}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <FilterPanel venues={venues} filters={filters} onChange={setFilters} />
        <p>Stream: {status}</p>
      </div>

      {filteredEvents.length === 0 && <p>No events match the current filters.</p>}

      <MapView venues={venues} events={filteredEvents} />
    </div>
  );
}

export default App;
