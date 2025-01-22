import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useGameData } from "./lib/hooks";
import Hero from "./components/landing/hero";
import CityContainer from "./components/city/city-container";
import GameRules from "./components/landing/game-rules";

export default function LandingPage() {
  const { gameData, isLoading, error } = useGameData();

  return isLoading ? (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  ) : error ? (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="p-6">
        <CardTitle className="text-red-500">Error</CardTitle>
        <CardContent>{error}</CardContent>
        <CardFooter>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </CardFooter>
      </Card>
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6">
      <div className="w-full mx-auto space-y-8">
        <Hero criminalImage={gameData.criminal?.imgSrc} />
        <CityContainer cityData={gameData.cities} />
        <GameRules />
      </div>
    </div>
  );
}
