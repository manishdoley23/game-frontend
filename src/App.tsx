import { useGameData } from "./lib/hooks";
import Hero from "./components/landing/hero";
import CityContainer from "./components/city/city-container";
import GameRules from "./components/landing/game-rules";
import PageWrapper from "./components/ui/page-wrapper";
import ErrorPage from "./components/ui/error-page";
import { useGameStore } from "./lib/store";
import { useEffect } from "react";
import LoadingPage from "./components/ui/loading-page";

export default function LandingPage() {
  const { gameData, error, isLoading } = useGameData();
  const initializeGame = useGameStore((state) => state.initializeGame);

  useEffect(() => {
    if (!error && !isLoading) {
      initializeGame({
        cops: gameData.cops,
        cities: gameData.cities,
        vehicles: gameData.vehicles,
        criminal: gameData.criminal!,
      });
    }
  }, [error, isLoading, gameData, initializeGame]);

  return isLoading ? (
    <LoadingPage />
  ) : error ? (
    <ErrorPage error={error} />
  ) : (
    <PageWrapper>
      <Hero criminalImage={gameData.criminal?.imgSrc} />
      <CityContainer cityData={gameData.cities} />
      <GameRules />
    </PageWrapper>
  );
}
