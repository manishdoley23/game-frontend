import type { GameState } from "./types";
import { City, Vehicle, Cop } from "@/data/types";
import { useGameStore } from "./store";

// Helper functions for city selection
const getSelectedCityIds = (cops: Cop[]): Set<string> => {
  const cityIds = cops
    .map((cop) => cop.selectedCity?.id)
    .filter((cityId): cityId is string => cityId != null);

  return new Set(cityIds);
};

const filterAvailableCities = (
  cities: City[],
  selectedCities: Set<string>
): City[] => {
  return cities.filter((city) => !selectedCities.has(city.id));
};

// Helper functions for vehicle selection
const initializeVehicleCounts = (vehicles: Vehicle[]): Map<string, number> => {
  const counts = new Map<string, number>();
  vehicles.forEach((vehicle) => {
    counts.set(vehicle.id, vehicle.availableCount);
  });
  return counts;
};

const subtractUsedVehicles = (
  vehicleCounts: Map<string, number>,
  cops: Cop[]
): Map<string, number> => {
  cops.forEach((cop) => {
    if (cop.selectedVehicle) {
      const currentCount = vehicleCounts.get(cop.selectedVehicle.id) || 0;
      vehicleCounts.set(cop.selectedVehicle.id, Math.max(0, currentCount - 1));
    }
  });
  return vehicleCounts;
};

const updateVehiclesWithCounts = (
  vehicles: Vehicle[],
  counts: Map<string, number>
): Vehicle[] => {
  return vehicles.map((vehicle) => ({
    ...vehicle,
    availableCount: counts.get(vehicle.id) || 0,
  }));
};

export const useAvailableCities = () => {
  const { cities, cops } = useGameStore();
  const excludedCopId = cops[0]?.id;

  const otherCops = cops.filter((cop) => cop.id !== excludedCopId);
  const selectedCities = getSelectedCityIds(otherCops);

  return filterAvailableCities(cities, selectedCities);
};

export const useAvailableVehicles = () => {
  const { vehicles, cops } = useGameStore();
  const vehicleCounts = initializeVehicleCounts(vehicles);
  const updatedCounts = subtractUsedVehicles(vehicleCounts, cops);

  return updateVehiclesWithCounts(vehicles, updatedCounts);
};

export const useCurrentCop = () =>
  useGameStore((state) => state.cops[state.currentCopIndex] || null);

export const checkWinCondition = (state: GameState): boolean => {
  if (!state.criminal?.cityHiding) return false;

  return state.cops.some(
    (cop) =>
      cop.selectedCity?.id === state.criminal?.cityHiding?.id &&
      cop.selectedVehicle &&
      cop.selectedCity &&
      cop.selectedVehicle.range >= cop.selectedCity.distance * 2
  );
};
