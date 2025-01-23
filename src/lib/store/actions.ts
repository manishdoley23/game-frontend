import { initialState } from "./store";
import type { GameState } from "./types";
import type { InvestigationResult, Cop } from "@/data/types";

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

  updateCop: (
    copId: string,
    updates: Partial<Pick<Cop, "selectedCity" | "selectedVehicle">>
  ) =>
    set((state) => ({
      cops: state.cops.map((cop) =>
        cop.id === copId ? { ...cop, ...updates } : cop
      ),
      gameStatus: updates.selectedCity ? "IN_PROGRESS" : state.gameStatus,
    })),

  setCurrentCopIndex: (index: number) =>
    set(() => ({ currentCopIndex: index })),

  moveToNextCopWithNoVehicle: () =>
    set((state) => {
      const nextCopIndex = state.cops.findIndex(
        (cop) => cop.selectedVehicle === null
      );
      return {
        currentCopIndex: nextCopIndex === -1 ? 0 : nextCopIndex,
      };
    }),

  moveToNextCopWithNoCity: () =>
    set((state) => {
      const nextCopIndex = state.cops.findIndex(
        (cop) => cop.selectedCity === null
      );

      console.log("nextCopIndex:", nextCopIndex);

      return {
        currentCopIndex: nextCopIndex === -1 ? 4 : nextCopIndex,
      };
    }),

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
