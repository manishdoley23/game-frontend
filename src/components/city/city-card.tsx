import { City } from "@/data/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const CityCard = ({ city }: { city: City }) => (
  <Card key={city.id} className="bg-slate-800/50 border-slate-700">
    <CardHeader>
      <CardTitle className="text-xl text-slate-400">{city.name}</CardTitle>
      <CardDescription className="text-slate-400">
        Distance: {city.distance} KM
      </CardDescription>
    </CardHeader>
    <CardContent>
      <img
        src={city.imgSrc}
        alt={city.name}
        className="w-full h-48 object-cover rounded-md mb-4"
        loading="lazy"
      />
      <p className="text-slate-300">{city.description}</p>
    </CardContent>
  </Card>
);
