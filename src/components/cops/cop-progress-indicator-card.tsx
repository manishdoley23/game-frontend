import { useGameStore } from "@/lib/store";
import { LoadingSpinner } from "../ui/loading-spinner";

type SelectionType = "city" | "vehicle";

export default function CopProgressIndicatorCard({
  selectionType,
}: {
  selectionType: SelectionType;
}) {
  const cops = useGameStore((state) => state.cops);

  if (!cops) return <LoadingSpinner />;

  const getSelectionCount = () => {
    if (selectionType === "city") {
      return cops.filter((cop) => cop.selectedCity).length;
    }
    return cops.filter((cop) => cop.selectedVehicle).length;
  };

  const totalCops = cops.length;
  const selectedCount = getSelectionCount();
  const progressPercentage = (selectedCount / totalCops) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm text-slate-400">
        <span>Selection Progress</span>
        <span>
          {selectedCount} of {totalCops}{" "}
          {selectionType === "city" ? "Cities" : "Vehicles"} Selected
        </span>
      </div>
      <div className="h-2 bg-slate-700 rounded overflow-hidden">
        <div
          className="h-full bg-green-400 transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}
