import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useGameData } from "./lib/hooks";
import Hero from "./components/landing/hero";
import CityContainer from "./components/city/city-container";
import GameRules from "./components/landing/game-rules";
import PageWrapper from "./components/ui/page-wrapper";
import ErrorPage from "./components/ui/error-page";

export default function LandingPage() {
  const { gameData, isLoading, error } = useGameData();

  return isLoading ? (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
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
