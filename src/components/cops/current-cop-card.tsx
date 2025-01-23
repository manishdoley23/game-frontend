import { useGameStore } from "@/lib/store";
import { LoadingSpinner } from "../ui/loading-spinner";
import { Cop } from "@/data/types";
import { useEffect, useState } from "react";

export default function CurrentCopCard() {
  const { cops, currentCopIndex } = useGameStore();
  const [currentCop, setCurrentCop] = useState<Cop | null>(null);

  useEffect(() => {
    if (currentCopIndex === null) return;
    setCurrentCop(cops[currentCopIndex]);
  }, [cops, currentCopIndex]);

  if (!currentCop) return <LoadingSpinner />;

  return (
    <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg flex-col md:flex-row">
      <img
        src={currentCop.imgSrc ?? ""}
        alt={currentCop.name ?? ""}
        className="w-16 h-16 rounded-full object-cover bg-slate-700/50"
      />
      <div>
        <h2 className="text-slate-300 text-2xl font-bold">
          {currentCop.name}'s Turn
        </h2>
        <p className="text-slate-300">Select a city to investigate</p>
      </div>
    </div>
  );
}
