import { useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAvailableVehicles, useCurrentCop, useGameStore } from "@/lib/store";
import { Vehicle } from "@/data/types";
import { useCallback } from "react";
import { submitInvestigationChoices } from "@/data/api";
import { useToast } from "@/hooks/use-toast";

export default function SelectVehicle() {
  const navigate = useNavigate();
  const availableVehicles = useAvailableVehicles();
  const currentCop = useCurrentCop();
  const { toast } = useToast();
  const {
    selectVehicle,
    moveToNextCop,
    setInvestigationResult,
    cops,
    currentCopIndex,
  } = useGameStore();

  const handleVehicleSelect = useCallback(
    async (vehicle: Vehicle) => {
      if (!currentCop) return;

      selectVehicle(currentCop.id, vehicle);

      const nextUnassignedIndex = cops.findIndex(
        (cop, index) => index > currentCopIndex && cop.selectedVehicle === null
      );
      console.log("nextUnassignedIndex: ", nextUnassignedIndex);

      if (nextUnassignedIndex !== -1) {
        moveToNextCop();
      }
    },
    [currentCop, cops, currentCopIndex, selectVehicle, moveToNextCop]
  );

  // Check if all cops have selected both city and vehicle
  const isAllSelectionsComplete = cops.every(
    (cop) => cop.selectedCity && cop.selectedVehicle
  );

  const handleSubmit = async () => {
    try {
      console.log("Submitting game choices");
      console.log("cops:", cops);
      const response = await submitInvestigationChoices({
        selectedChoices: cops,
      });

      setInvestigationResult(response);
      navigate("/result");
    } catch (error) {
      console.error("Error submitting game choices:", error);
      toast({
        title: "Failed to submit choices",
        variant: "destructive",
      });
    }
  };

  if (!currentCop || !currentCop.selectedCity) {
    navigate("/game/select-city");
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Select Vehicle</h2>
          <p className="text-slate-400 mt-1">
            Choose a vehicle for{" "}
            <span className="text-white font-medium">{currentCop.name}</span> to
            reach{" "}
            <span className="text-white font-medium">
              {currentCop.selectedCity.name}
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {availableVehicles.map((vehicle) => (
          <Card
            key={vehicle.id}
            className={`relative overflow-hidden transition-all duration-200 
              ${
                vehicle.availableCount <= 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:border-blue-500 cursor-pointer"
              }`}
          >
            <CardContent className="p-6 space-y-4">
              <div className="aspect-square relative rounded-lg overflow-hidden bg-slate-800">
                <img
                  src={vehicle.imgSrc}
                  alt={vehicle.name}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">{vehicle.name}</h3>
                  <span className="text-sm text-slate-400">
                    {vehicle.availableCount} available
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-sm text-slate-300">
                    Range: {vehicle.range} km
                  </div>
                </div>

                <Button
                  className="w-full"
                  disabled={vehicle.availableCount <= 0}
                  onClick={() => handleVehicleSelect(vehicle)}
                >
                  Select Vehicle
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {isAllSelectionsComplete && (
        <div className="flex justify-center mt-8">
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700"
            onClick={handleSubmit}
          >
            Submit All Choices
          </Button>
        </div>
      )}
    </div>
  );
}
