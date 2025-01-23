import { City } from "@/data/types";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { useCallback } from "react";
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
  const navigate = useNavigate();
  const moveToNextCop = useGameStore((state) => state.moveToNextCop);
  const selectCity = useGameStore((state) => state.selectCity);
  const cops = useGameStore((state) => state.cops);
  const currentCopIndex = useGameStore((state) => state.currentCopIndex);
  const currentCop = cops[currentCopIndex];

  const handleCitySelect = useCallback(
    async (city: City) => {
      if (!currentCop) return;
      selectCity(currentCop.id, city);
      const nextUnassignedIndex = cops.findIndex(
        (cop, index) => index > currentCopIndex && cop.selectedCity === null
      );
      if (nextUnassignedIndex !== -1) {
        moveToNextCop();
      } else {
        moveToNextCop();
        navigate("/game/select-vehicle");
      }
    },
    [currentCop, cops, currentCopIndex, selectCity, moveToNextCop, navigate]
  );

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
