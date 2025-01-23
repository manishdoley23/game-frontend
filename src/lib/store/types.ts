import type {
  Cop,
  City,
  Vehicle,
  Criminal,
  InvestigationResult,
} from "@/data/types";

export type GameStatus = "NOT_STARTED" | "IN_PROGRESS" | "WON" | "LOST";

export interface GameState {
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;

  // Data
  cops: Cop[];
  cities: City[];
  vehicles: Vehicle[];
  criminal: Criminal | null;
  // Game progress
  currentCopIndex: number | null;
  gameStatus: GameStatus;
  // Investigation result
  investigationResult: InvestigationResult | null;
}

export interface GameActions {
  initializeGame: (data: {
    cops: Cop[];
    cities: City[];
    vehicles: Vehicle[];
    criminal: Criminal;
  }) => void;
  setError: (error: string) => void;
  resetGame: () => void;
  updateCop: (
    copId: string,
    updates: Partial<Pick<Cop, "selectedCity" | "selectedVehicle">>
  ) => void;
  setCurrentCopIndex: (index: number | null) => void;
  moveToNextCopWithNoVehicle: () => void;
  moveToNextCopWithNoCity: () => void;
  setInvestigationResult: (result: InvestigationResult) => void;
  completeGame: (result: InvestigationResult) => void;
}

export type GameStore = GameState & GameActions;
