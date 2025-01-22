import { Criminal } from "../types/criminal-types";
import { api } from "./config";

export async function getCriminal(): Promise<Criminal> {
  try {
    const response = await api.get("criminal");
    console.log("Fetched criminal", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch criminal", error);
    throw error;
  }
}
