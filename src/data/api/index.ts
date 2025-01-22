import { Vehicle } from "../types/vehicle-types";
import { api } from "./config";
import { Cop } from "../types/cop-types";
import { Criminal } from "../types/criminal-types";
import { City } from "../types/city-types";

export async function getCities(): Promise<City[]> {
  try {
    const response = await api.get("city");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch cities", error);
    throw error;
  }
}

export async function getCriminal(): Promise<Criminal> {
  try {
    const response = await api.get("criminal");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch criminal", error);
    throw error;
  }
}

export async function getCops(): Promise<Cop[]> {
  try {
    const response = await api.get("cop");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch cities", error);
    throw error;
  }
}

export async function getVehicles(): Promise<Vehicle[]> {
  try {
    const response = await api.get("vehicle");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch vehicles", error);
    throw error;
  }
}

export async function submitInvestigationChoices({
  selectedChoices,
}: {
  selectedChoices: Cop[];
}) {
  try {
    const response = await api.post("game/investigation", selectedChoices);
    return response.data;
  } catch (error) {
    console.error("Failed to submit investigation choices", error);
    throw error;
  }
}

export async function resetGame() {
  try {
    const response = await api.post("game/reset");
    return response.data;
  } catch (error) {
    console.error("Failed to reset game", error);
    throw error;
  }
}
