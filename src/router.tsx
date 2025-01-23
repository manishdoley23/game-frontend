import GameLayout from "@/routes/game/game-layout";
import { Route, Routes } from "react-router";
import SelectCity from "./routes/game/select-city";
import LandingPage from "./App";
import SelectVehicle from "./routes/game/select-vehicle";
import Result from "./routes/result/result";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route element={<GameLayout />}>
        <Route path="game/select-city" element={<SelectCity />} />
        <Route path="game/select-vehicle" element={<SelectVehicle />} />
      </Route>

      <Route path="/result" element={<Result />} />
    </Routes>
  );
}
