import { API_BASE_URL } from "./client";
import type { Venue } from "../types/api";

export async function fetchVenues(): Promise<Venue[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/venues`);
        if (!response.ok) {
            throw new Error(`Failed to load venues: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched venues:", data);
        return data;
    }
    catch (error) {
        console.error("Error fetching venues:", error);
        throw error;
    }
}