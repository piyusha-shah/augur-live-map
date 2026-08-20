import { useEffect, useState } from "react";
import { fetchVenues } from "./api/venue";
import type { Venue } from "./types/api";
import { MapView } from "./map/MapView";
import { useEventStream } from "./hooks/useEventStream";

function App() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const { events, totalReceived, status } = useEventStream();

  useEffect(() => {
    fetchVenues().then(setVenues);
  }, []);

  return (
    <div>
      <p>
        Stream status: {status} · Showing {events.length} of {totalReceived} received
      </p>      <MapView venues={venues} events={events} />
    </div>
  );
}

export default App;
