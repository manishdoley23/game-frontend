import { Cop } from "../types/cop-types";
import { api } from "./config";

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
