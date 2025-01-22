import { City } from "./city-types";

export interface Criminal {
  id: string;
  name: string;
  cityHiding: City | null;
  imgSrc: string;
}
