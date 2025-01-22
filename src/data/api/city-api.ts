import { City } from "../types/city-types";
import { api } from "./config";

export async function getCities(): Promise<City[]> {
  try {
    const response = await api.get("cities");
    console.log("Fetched cities", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch cities", error);
    throw error;
  }
}
