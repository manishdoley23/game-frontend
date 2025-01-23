import { Cop, Vehicle } from "@/data/types";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { useCallback, useEffect, useState } from "react";
import { useGameStore } from "@/lib/store";
import { toast } from "@/lib/hooks/use-toast";

export default function VehicleGridCard({ vehicle }: { vehicle: Vehicle }) {
  const [currentCop, setCurrentCop] = useState<Cop | null>(null);
  const moveToNextCop = useGameStore(
    (state) => state.moveToNextCopWithNoVehicle
  );
  const selectVehicle = useGameStore((state) => state.updateCop);
  const cops = useGameStore((state) => state.cops);
  const currentCopIndex = useGameStore((state) => state.currentCopIndex);

  const handleVehicleSelect = useCallback(
    (vehicle: Vehicle) => {
      if (!currentCop) return;

      if (
        currentCop.selectedCity &&
        currentCop.selectedCity?.distance > vehicle.range / 2
      ) {
        toast({
          title: "Vehicle Range Error",
          description:
            "Vehicle range is not enough to reach the city. Please select a different vehicle",
          variant: "destructive",
        });
        return;
      }

      selectVehicle(currentCop.id, { selectedVehicle: vehicle });

      const nextUnassignedIndex = cops.findIndex(
        (cop) => cop.selectedVehicle === null
      );

      if (nextUnassignedIndex !== -1) {
        moveToNextCop();
      }
    },
    [currentCop, cops, selectVehicle, moveToNextCop]
  );

  useEffect(() => {
    if (currentCopIndex === null) return;
    const copIndex = cops.findIndex((cop) => cop.selectedVehicle === null);
    setCurrentCop(cops[copIndex]);
  }, [cops, currentCopIndex]);

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
