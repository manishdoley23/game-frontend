import { useGameStore } from "@/lib/store";
import { useEffect, useMemo, useState } from "react";
import CityGridCard from "./city-grid-card";
import { Cop } from "@/data/types";

export default function CityGrid() {
  const [currentCop, setCurrentCop] = useState<Cop | null>(null);
  const { cities, currentCopIndex, cops } = useGameStore();
  const availableCities = useMemo(
    () =>
      cities.filter(
        (city) =>
          !cops.some(
            (cop) =>
              cop.id !== currentCop?.id && cop.selectedCity?.id === city.id
          )
      ),
    [cities, cops, currentCop]
  );

  useEffect(() => {
    if (currentCopIndex === null) return;
    setCurrentCop(cops[currentCopIndex]);
  }, [currentCopIndex, cops]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cities.map((city) => {
        const isUnavailable = !availableCities.some((c) => c.id === city.id);
        const isSelected = currentCop
          ? currentCop.selectedCity?.id === city.id
          : false;

        return (
          <CityGridCard
            key={city.id}
            isSelected={isSelected}
            isUnavailable={isUnavailable}
            city={city}
          />
        );
      })}
    </div>
  );
}
