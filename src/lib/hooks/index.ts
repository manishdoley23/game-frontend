import { getCities, getCops, getCriminal, getVehicles } from "@/data/api";
import { City, Cop, Criminal, Vehicle } from "@/data/types";
import { useEffect, useMemo, useState } from "react";
interface AsyncState<T> {
  data: T;
  isLoading: boolean;
  error: string | null;
}

const useAsync = <T>(asyncFn: () => Promise<T>): AsyncState<T> => {
  const [state, setState] = useState<AsyncState<T>>({
    data: null as unknown as T,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }));
        const data = await asyncFn();
        setState({
          data,
          isLoading: false,
          error: null,
        });
      } catch (err) {
        setState({
          data: null as unknown as T,
          isLoading: false,
          error: err instanceof Error ? err.message : "Failed to fetch data",
        });
      }
    };

    fetchData();
  }, [asyncFn]);

  return state;
};

export const useCriminal = () => {
  return useAsync<Criminal | null>(getCriminal);
};

export const useCities = () => {
  return useAsync<City[]>(getCities);
};

export const useCops = () => {
  return useAsync<Cop[]>(getCops);
};

export const useVehicle = () => {
  return useAsync<Vehicle[]>(getVehicles);
};

export const useGameData = () => {
  const criminal = useCriminal();
  const cities = useCities();
  const vehicles = useVehicle();
  const cops = useCops();

  const combinedState = useMemo(() => {
    return {
      isLoading: criminal.isLoading || cities.isLoading,
      error: criminal.error || cities.error,
      gameData: {
        criminal: criminal.data,
        cities: cities.data,
        vehicles: vehicles.data,
        cops: cops.data,
      },
    };
  }, [criminal, cities, vehicles, cops]);

  return combinedState;
};
