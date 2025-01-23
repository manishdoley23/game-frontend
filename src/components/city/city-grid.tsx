import { useGameStore } from "@/lib/store";
import { useMemo } from "react";
import CityGridCard from "./city-grid-card";

export default function CityGrid() {
  const { cities, currentCopIndex, cops } = useGameStore();
  const currentCop = cops[currentCopIndex];
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cities.map((city) => {
        const isUnavailable = !availableCities.some((c) => c.id === city.id);
        const isSelected = currentCop.selectedCity?.id === city.id;

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
