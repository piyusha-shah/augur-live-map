import { useEffect, useState } from "react";
import { fetchVenues } from "./api/venue";
import type { Venue } from "./types/api";
import { MapView } from "./map/MapView";
import { useEventStream } from "./hooks/useEventStream";

function App() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const { events, status } = useEventStream();

  useEffect(() => {
    fetchVenues().then(setVenues);
  }, []);

  return (
    <div>
      <p>Stream status: {status}</p>
      <p>Events received: {events.length}</p>
      <MapView venues={venues} />
    </div>
  );
}

export default App;
