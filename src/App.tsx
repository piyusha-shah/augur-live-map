import { useEffect, useState } from "react";
import type { Venue } from "./types/api";
import { fetchVenues } from "./api/venue";

function App() {
  const [venues, setVenues] = useState<Venue[]>([]);

  useEffect(() => {
    fetchVenues().then(setVenues);
  }, []);

  return (
    <ul>
      {venues.map((v) => (
        <li key={v.id}>{v.name}</li>
      ))}
    </ul>
  );
}

export default App;