import type { Cop, City, Vehicle, Criminal } from "@/data/types";

export type GameStatus = "NOT_STARTED" | "IN_PROGRESS" | "WON" | "LOST";

export interface GameState {
  // Data
  cops: Cop[];
  cities: City[];
  vehicles: Vehicle[];
  criminal: Criminal | null;

  // Game progress
  currentCopIndex: number;
  gameStatus: GameStatus;
}

export interface GameActions {
  initializeGame: (data: {
    cops: Cop[];
    cities: City[];
    vehicles: Vehicle[];
    criminal: Criminal;
  }) => void;
  selectCity: (copId: string, city: City) => void;
  selectVehicle: (copId: string, vehicle: Vehicle) => void;
  moveToNextCop: () => void;
  resetGame: () => void;
}

export type GameStore = GameState & GameActions;
