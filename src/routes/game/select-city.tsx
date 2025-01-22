// src/routes/game/select-city.tsx
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { City } from "@/data/types/city-types";
import { useGameStore } from "@/lib/store";

export default function SelectCity() {
  const navigate = useNavigate();

  // Get state from store with single subscription
  const { currentCopIndex, cities, cops, selectCity, moveToNextCop } =
    useGameStore();
  const currentCop = cops[currentCopIndex];

  console.log("cities: ", cities);

  // Memoize available cities calculation
  const availableCities = cities.filter(
    (city) =>
      !cops.some(
        (cop) => cop.id !== currentCop?.id && cop.selectedCity?.id === city.id
      )
  );

  const handleCitySelect = useCallback(
    async (city: City) => {
      if (!currentCop) return;

      // Update store
      selectCity(currentCop.id, city);

      // Check if there are more cops to select cities
      const nextUnassignedIndex = cops.findIndex(
        (cop, index) => index > currentCopIndex && cop.selectedCity === null
      );
      console.log("nextUnassignedIndex: ", nextUnassignedIndex);

      if (nextUnassignedIndex !== -1) {
        moveToNextCop();
      } else {
        moveToNextCop();
        navigate("/game/select-vehicle");
      }
    },
    [currentCop, cops, currentCopIndex, selectCity, moveToNextCop, navigate]
  );

  if (!currentCop) return null;

  return (
    <div className="space-y-6">
      {/* Current Cop Header */}
      <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg">
        <img
          src={currentCop.imgSrc}
          alt={currentCop.name}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-2xl font-bold">{currentCop.name}'s Turn</h2>
          <p className="text-slate-300">Select a city to investigate</p>
        </div>
      </div>

      {/* City Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cities.map((city) => {
          const isUnavailable = !availableCities.some((c) => c.id === city.id);
          const isSelected = currentCop.selectedCity?.id === city.id;

          return (
            <Card
              key={city.id}
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
                  <p className="text-sm text-slate-400">
                    Distance: {city.distance} KM
                  </p>
                  <p className="text-sm mt-2">{city.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-between items-center mt-6">
        {cops.map((cop, index) => (
          <div
            key={cop.id}
            className={`flex-1 h-2 mx-1 rounded ${
              index < currentCopIndex
                ? "bg-green-500"
                : index === currentCopIndex
                ? "bg-purple-500"
                : "bg-slate-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
