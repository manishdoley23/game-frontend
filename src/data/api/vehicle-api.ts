import { Vehicle } from "../types/vehicle-types";
import { api } from "./config";

export async function getVehicles(): Promise<Vehicle[]> {
  try {
    const response = await api.get("vehicles");
    console.log("Fetched vehicles", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch vehicles", error);
    throw error;
  }
}
