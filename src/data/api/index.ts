import { Vehicle } from "../types/vehicle-types";
import { api } from "./config";
import { Cop } from "../types/cop-types";
import { Criminal } from "../types/criminal-types";
import { City } from "../types/city-types";

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

export async function getCops(): Promise<Cop[]> {
  try {
    const response = await api.get("cop");
    console.log("Fetched cities", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch cities", error);
    throw error;
  }
}

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

export async function submitInvestigationChoices({
  selectedChoices,
}: {
  selectedChoices: Cop[];
}) {
  try {
    console.log("Submitting investigation choices", selectedChoices);
    const response = await api.post("investigation", selectedChoices);
    console.log("Submitted investigation choices", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to submit investigation choices", error);
    throw error;
  }
}
