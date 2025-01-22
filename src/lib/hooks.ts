import { getCities } from "@/data/api/city-api";
import { getCriminal } from "@/data/api/criminal-api";
import { City } from "@/data/types/city-types";
import { Criminal } from "@/data/types/criminal-types";
import { useEffect, useMemo, useState } from "react";

interface CriminalState {
  data: Criminal | null;
  isLoading: boolean;
  error: string | null;
}

interface CitiesState {
  data: City[];
  isLoading: boolean;
  error: string | null;
}

export const useCriminal = () => {
  const [state, setState] = useState<CriminalState>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchCriminal = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }));
        const criminalData = await getCriminal();
        setState({
          data: criminalData,
          isLoading: false,
          error: null,
        });
      } catch (err) {
        setState({
          data: null,
          isLoading: false,
          error:
            err instanceof Error
              ? err.message
              : "Failed to fetch criminal data",
        });
      }
    };

    fetchCriminal();
  }, []);

  return state;
};

export const useCities = () => {
  const [state, setState] = useState<CitiesState>({
    data: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }));
        const citiesData = await getCities();
        setState({
          data: citiesData,
          isLoading: false,
          error: null,
        });
      } catch (err) {
        setState({
          data: [],
          isLoading: false,
          error:
            err instanceof Error ? err.message : "Failed to fetch cities data",
        });
      }
    };

    fetchCities();
  }, []);

  return state;
};

export const useGameData = () => {
  const criminal = useCriminal();
  const cities = useCities();

  const combinedState = useMemo(() => {
    return {
      isLoading: criminal.isLoading || cities.isLoading,
      error: criminal.error || cities.error,
      gameData: {
        criminal: criminal.data,
        cities: cities.data,
      },
    };
  }, [criminal, cities]);

  return combinedState;
};
