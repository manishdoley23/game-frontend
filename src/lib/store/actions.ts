import { initialState } from "./store";
import type { GameState } from "./types";
import type { City, Vehicle, InvestigationResult } from "@/data/types";

export const createGameActions = (
  set: (fn: (state: GameState) => Partial<GameState>) => void
) => ({
  initializeGame: (data: Partial<GameState>) =>
    set(() => ({
      error: null,
      isInitialized: true,
      isLoading: false,
      cops: data.cops,
      cities: data.cities,
      vehicles: data.vehicles,
      criminal: data.criminal,
      gameStatus: "NOT_STARTED",
      currentCopIndex: 0,
    })),

  setError: (error: string) =>
    set(() => ({
      isInitialized: false,
      isLoading: false,
      error,
    })),

  resetGame: () => set(() => initialState),

  selectCity: (copId: string, city: City) =>
    set((state) => ({
      cops: state.cops.map((cop) =>
        cop.id === copId ? { ...cop, selectedCity: city } : cop
      ),
      gameStatus: "IN_PROGRESS",
    })),

  selectVehicle: (copId: string, vehicle: Vehicle) =>
    set((state) => ({
      cops: state.cops.map((cop) =>
        cop.id === copId ? { ...cop, selectedVehicle: vehicle } : cop
      ),
    })),

  moveToNextCop: () =>
    set((state) => ({
      currentCopIndex:
        state.currentCopIndex + 1 < state.cops.length
          ? state.currentCopIndex + 1
          : 0,
    })),

  setInvestigationResult: (result: InvestigationResult) =>
    set(() => ({
      investigationResult: result,
      gameStatus: result.success ? "WON" : "LOST",
    })),

  completeGame: (result: InvestigationResult) =>
    set(() => ({
      investigationResult: result,
      gameStatus: result.success ? "WON" : "LOST",
      currentCopIndex: 0,
    })),
});
