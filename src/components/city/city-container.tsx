import { City } from "@/data/types/city-types";
import { CityCard } from "./city-card";

export default function CityContainer({ cityData }: { cityData: City[] }) {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">Potential Hideouts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cityData.map((city) => (
          <CityCard key={city.id} city={city} />
        ))}
      </div>
    </div>
  );
}
