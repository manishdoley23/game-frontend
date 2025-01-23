import { Cop } from "@/data/types";
import { Card, CardContent } from "../ui/card";
import { useGameStore } from "@/lib/store";
import { LoadingSpinner } from "../ui/loading-spinner";

export default function CopCard({ cop }: { cop: Cop }) {
  const cities = useGameStore((state) => state.cities);
  const vehicles = useGameStore((state) => state.vehicles);

  const updatedCop = useGameStore((state) =>
    state.cops.find((c) => c.id === cop.id)
  );

  const getSelectionStatus = () => {
    if (!updatedCop?.selectedCity)
      return { text: "Awaiting City Selection", color: "text-yellow-400" };
    if (!updatedCop?.selectedVehicle)
      return { text: "Awaiting Vehicle Selection", color: "text-blue-400" };
    return { text: "Ready for Mission", color: "text-green-400" };
  };

  const status = getSelectionStatus();
  const selectedCity = cities.find(
    (c) => c.id === updatedCop?.selectedCity?.id
  );
  const selectedVehicle = vehicles.find(
    (v) => v.id === updatedCop?.selectedVehicle?.id
  );

  if (!updatedCop) return <LoadingSpinner />;

  return (
    <Card className="bg-slate-800/50 border-slate-700 overflow-hidden text-slate-400">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Cop Header */}
          <div className="flex items-center gap-4">
            <img
              src={updatedCop.imgSrc}
              alt={updatedCop.name}
              className="w-16 h-16 object-cover rounded-full bg-slate-700/50"
            />
            <div>
              <h3 className="font-bold text-lg">{updatedCop.name}</h3>
              <div className="text-sm">
                <span className={status.color}>{status.text}</span>
              </div>
            </div>
          </div>

          {/* Selections Display */}
          <div className="grid grid-cols-2 gap-4">
            {/* City Selection */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-slate-400">
                Selected City
              </div>
              {selectedCity ? (
                <div className="flex items-start justify-center gap-2 flex-col lg:flex-row">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-700">
                    <img
                      src={selectedCity.imgSrc}
                      alt={selectedCity.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-white">
                      {selectedCity.name}
                    </div>
                    <div className="text-sm text-slate-400">
                      {selectedCity.distance} km
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-12 flex items-center text-sm text-slate-500">
                  No city selected
                </div>
              )}
            </div>

            {/* Vehicle Selection */}
            <div className="space-y-2">
              <div className="text-xs md:text-sm font-medium text-slate-400">
                Selected Vehicle
              </div>
              {selectedVehicle ? (
                <div className="flex items-start gap-2 flex-col lg:flex-row">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-700">
                    <img
                      src={selectedVehicle.imgSrc}
                      alt={selectedVehicle.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-white">
                      {selectedVehicle.name}
                    </div>
                    <div className="text-sm text-slate-400">
                      Range: {selectedVehicle.range} km
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-12 flex items-center text-sm text-slate-500">
                  No vehicle selected
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
