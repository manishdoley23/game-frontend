export interface Cop {
  id: string;
  name: string;
  selectedCity: City | null;
  selectedVehicle: Vehicle | null;
  imgSrc: string;
}

export interface Vehicle {
  id: string;
  name: string;
  range: number;
  availableCount: number;
  imgSrc: string;
}

export interface InvestigationResult {
  success: boolean;
  message: string;
  winner?: Cop;
  hints?: string[];
  gameStatus?: {
    criminal: Criminal;
    correctCity: string;
    requiredRange: number;
  };
}

export interface Criminal {
  id: string;
  name: string;
  cityHiding: City | null;
  imgSrc: string;
}

export interface City {
  id: string;
  name: string;
  distance: number;
  description: string;
  imgSrc: string;
}
