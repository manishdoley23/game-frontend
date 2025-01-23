import React from "react";
import { useGameStore } from "@/lib/store";
import { Trash2 } from "lucide-react";

export default function SelectionCard({
  type,
  copId,
  children,
}: {
  type: "city" | "vehicle";
  copId: string;
  children: React.ReactNode;
}) {
  const updateCop = useGameStore((state) => state.updateCop);
  const cops = useGameStore((state) => state.cops);
  const setCurrentCopIndex = useGameStore((state) => state.setCurrentCopIndex);

  const handleUnselect = () => {
    let copIndex: number;
    if (type === "vehicle") {
      updateCop(copId, { selectedVehicle: null });
      copIndex = cops.findIndex((cop) => cop.id === copId);
      setCurrentCopIndex(copIndex);
    } else {
      updateCop(copId, { selectedCity: null });
      copIndex = cops.findIndex((cop) => cop.id === copId);
      setCurrentCopIndex(copIndex);
    }
  };

  return (
    <div className="relative group flex flex-start">
      {children}

      <button
        onClick={handleUnselect}
        className="absolute top-1/2 -translate-y-1/2 left-2 p-1 rounded-md bg-red-500/60 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-500/20"
        aria-label="Unselect city"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
