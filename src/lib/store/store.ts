import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { GameStore } from "./types";
import { createGameActions } from "./actions";

const initialState = {
  cops: [],
  cities: [],
  vehicles: [],
  criminal: null,
  currentCopIndex: 0,
  gameStatus: "NOT_STARTED",
  investigationResult: null,
} as const;

export const useGameStore = create<GameStore>()(
  devtools(
    (set) => ({
      ...initialState,
      ...createGameActions(set),
    }),
    {
      name: "Game Store",
      enabled: process.env.NODE_ENV === "development",
    }
  )
);
