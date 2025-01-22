import type { GameState } from "./types";
import type { Cop, City, Vehicle, Criminal } from "@/data/types";

export interface GameInitializationData {
  cops: Cop[];
  cities: City[];
  vehicles: Vehicle[];
  criminal: Criminal;
}

export const createGameActions = (
  set: (fn: (state: GameState) => Partial<GameState>) => void
) => ({
  initializeGame: (data: GameInitializationData) =>
    set(() => ({
      cops: data.cops,
      cities: data.cities,
      vehicles: data.vehicles,
      criminal: data.criminal,
      gameStatus: "NOT_STARTED",
      currentCopIndex: 0,
    })),

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

  resetGame: () =>
    set((state) => ({
      cops: state.cops.map((cop) => ({
        ...cop,
        selectedCity: null,
        selectedVehicle: null,
      })),
      currentCopIndex: 0,
      gameStatus: "NOT_STARTED",
    })),
});
