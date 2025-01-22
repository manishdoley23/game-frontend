import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App.tsx";
import GameLayout from "./routes/game/game-layout.tsx";
import SelectCity from "./routes/game/select-city.tsx";
import SelectVehicle from "./routes/game/select-vehicle.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route element={<GameLayout />}>
          <Route path="game/select-city" element={<SelectCity />} />
          <Route path="game/select-vehicle" element={<SelectVehicle />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
