import CurrentCopCard from "@/components/cops/current-cop-card";
import CityGrid from "@/components/city/city-grid";
import CopProgressIndicatorCard from "@/components/cops/cop-progress-indicator-card";

export default function SelectCity() {
  return (
    <div className="space-y-6">
      {/* Current Cop Header */}
      <CurrentCopCard />
      {/* City Grid */}
      <CityGrid />
      {/* Progress Indicator */}
      <CopProgressIndicatorCard />
    </div>
  );
}
