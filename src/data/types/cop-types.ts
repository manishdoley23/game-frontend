import { City } from "./city-types";
import { Vehicle } from "./vehicle-types";

export interface Cop {
  id: string;
  name: string;
  selectedCity: City | null;
  selectedVehicle: Vehicle | null;
  imgSrc: string;
}
