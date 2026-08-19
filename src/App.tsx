import { useEffect, useState } from "react";
import type { Venue } from "./types/api";

import { MapView } from "./map/MapView";
import { fetchVenues } from "./api/venue";

function App() {
  const [venues, setVenues] = useState<Venue[]>([]);

  useEffect(() => {
    fetchVenues().then(setVenues);
  }, []);

  return <MapView venues={venues} />;
}

export default App;