import { Vehicle } from "@/data/types";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { useCallback } from "react";
import { useGameStore } from "@/lib/store";

export default function VehicleGridCard({ vehicle }: { vehicle: Vehicle }) {
  const moveToNextCop = useGameStore((state) => state.moveToNextCop);
  const selectVehicle = useGameStore((state) => state.selectVehicle);
  const cops = useGameStore((state) => state.cops);
  const currentCopIndex = useGameStore((state) => state.currentCopIndex);

  const currentCop = cops[currentCopIndex];

  const handleVehicleSelect = useCallback(
    async (vehicle: Vehicle) => {
      if (!currentCop) return;

      selectVehicle(currentCop.id, vehicle);

      const nextUnassignedIndex = cops.findIndex(
        (cop, index) => index > currentCopIndex && cop.selectedVehicle === null
      );

      if (nextUnassignedIndex !== -1) {
        moveToNextCop();
      }
    },
    [currentCop, cops, currentCopIndex, selectVehicle, moveToNextCop]
  );

  return (
    <Card
      className={`
            transition-all cursor-pointer
            ${
              vehicle.availableCount <= 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:ring-2 hover:ring-purple-500/50"
            }
          `}
      onClick={() => {
        if (vehicle.availableCount >= 0) {
          handleVehicleSelect(vehicle);
        }
      }}
    >
      <CardContent className="p-4 space-y-4">
        <div className="relative">
          <img
            src={vehicle.imgSrc}
            alt={vehicle.name}
            className="w-full h-32 object-cover rounded-md"
          />
          {vehicle.availableCount <= 0 && (
            <Badge className="absolute top-2 right-2 bg-red-500">
              Out of stock
            </Badge>
          )}
        </div>
        <div>
          <h3 className="font-bold">{vehicle.name}</h3>
          <p className="text-sm text-slate-400">Range: {vehicle.range} KM</p>
          <p className="text-sm mt-2">Available: {vehicle.availableCount}</p>
        </div>
      </CardContent>
    </Card>
  );
}
