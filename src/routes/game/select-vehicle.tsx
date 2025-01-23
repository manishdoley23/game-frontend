import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useAvailableVehicles, useCurrentCop, useGameStore } from "@/lib/store";
import { submitInvestigationChoices } from "@/data/api";
import CurrentCopCard from "@/components/cops/current-cop-card";
import VehicleGridCard from "@/components/vehicle/vehicle-grid-card";
import CopProgressIndicatorCard from "@/components/cops/cop-progress-indicator-card";
import { useToast } from "@/lib/hooks/use-toast";

export default function SelectVehicle() {
  const navigate = useNavigate();
  const availableVehicles = useAvailableVehicles();
  const currentCop = useCurrentCop();
  const { toast } = useToast();
  const { setInvestigationResult, cops } = useGameStore();

  const isAllSelectionsComplete = cops.every(
    (cop) => cop.selectedCity && cop.selectedVehicle
  );

  const handleSubmit = async () => {
    try {
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
      <CurrentCopCard />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {availableVehicles.map((vehicle) => (
          <VehicleGridCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>

      <CopProgressIndicatorCard />

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
