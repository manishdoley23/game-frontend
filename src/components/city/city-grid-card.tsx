import { City, Cop } from "@/data/types";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { useCallback, useEffect, useState } from "react";
import { useGameStore } from "@/lib/store";
import { useNavigate } from "react-router";

export default function CityGridCard({
  city,
  isSelected,
  isUnavailable,
}: {
  city: City;
  isSelected: boolean;
  isUnavailable: boolean;
}) {
  const [currentCop, setCurrentCop] = useState<Cop | null>(null);
  const navigate = useNavigate();
  const moveToNextCop = useGameStore((state) => state.moveToNextCopWithNoCity);
  const selectCity = useGameStore((state) => state.updateCop);
  const setCurrentCopIndex = useGameStore((state) => state.setCurrentCopIndex);
  const cops = useGameStore((state) => state.cops);
  const currentCopIndex = useGameStore((state) => state.currentCopIndex);

  const handleCitySelect = useCallback(
    (city: City) => {
      if (!currentCop) return;
      selectCity(currentCop.id, { selectedCity: city });

      const allCitiesSelected = cops.every((cop) => cop.selectedCity);
      if (allCitiesSelected) {
        const copWithNoVehicleSelected = cops.findIndex(
          (cop) => cop.selectedVehicle === null
        );
        if (copWithNoVehicleSelected === -1) {
          setCurrentCopIndex(null);
        } else {
          setCurrentCopIndex(copWithNoVehicleSelected);
        }
        navigate("/game/select-vehicle");
        return;
      }

      const nextUnassignedIndex = cops.findIndex(
        (cop) => cop.selectedCity === null
      );

      if (nextUnassignedIndex !== -1) {
        moveToNextCop();
      } else {
        setCurrentCopIndex(0);
        navigate("/game/select-vehicle");
      }
    },
    [currentCop, cops, selectCity, moveToNextCop, navigate, setCurrentCopIndex]
  );

  useEffect(() => {
    if (currentCopIndex === 4) {
      setCurrentCopIndex(0);
      navigate("/game/select-vehicle");
      return;
    } else if (currentCopIndex !== null) {
      setCurrentCop(cops[currentCopIndex]);
    }
  }, [cops, currentCopIndex, setCurrentCop, navigate, setCurrentCopIndex]);

  return (
    <Card
      className={`
            transition-all cursor-pointer
            ${isSelected ? "ring-2 ring-purple-500" : ""}
            ${
              isUnavailable
                ? "opacity-50 cursor-not-allowed"
                : "hover:ring-2 hover:ring-purple-500/50"
            }
          `}
      onClick={() => {
        if (!isUnavailable) {
          handleCitySelect(city);
        }
      }}
    >
      <CardContent className="p-4 space-y-4">
        <div className="relative">
          <img
            src={city.imgSrc}
            alt={city.name}
            className="w-full h-32 object-cover rounded-md"
          />
          {isUnavailable && (
            <Badge className="absolute top-2 right-2 bg-red-500">
              Already Assigned
            </Badge>
          )}
        </div>
        <div>
          <h3 className="font-bold">{city.name}</h3>
          <p className="text-sm text-slate-400">Distance: {city.distance} KM</p>
          <p className="text-sm mt-2">{city.description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
