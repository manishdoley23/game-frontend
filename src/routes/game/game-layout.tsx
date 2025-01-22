import { Outlet } from "react-router";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useCops, useGameData, useVehicle } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import PageWrapper from "@/components/ui/page-wrapper";
import { useEffect } from "react";
import { useGameStore } from "@/lib/store";
import CopCard from "@/components/cops/cop-card";

export default function GameLayout() {
  const initializeGame = useGameStore((state) => state.initializeGame);

  const {
    gameData,
    error: gameDataError,
    isLoading: gameDataLoading,
  } = useGameData();

  const { data: cops, error: copsError, isLoading: copsLoading } = useCops();

  const {
    data: vehicles,
    error: vehiclesError,
    isLoading: vehiclesLoading,
  } = useVehicle();

  const isLoading = gameDataLoading || copsLoading || vehiclesLoading;
  const error = gameDataError || copsError || vehiclesError;

  useEffect(() => {
    if (!isLoading && !error && gameData && cops && vehicles) {
      initializeGame({
        cops,
        cities: gameData.cities,
        vehicles,
        criminal: gameData.criminal!,
      });
    }
  }, [gameData, cops, vehicles, initializeGame, isLoading, error]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <Card className="p-6">
          <CardTitle className="text-red-500">Error</CardTitle>
          <CardContent>{error}</CardContent>
          <CardFooter>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  return (
    <PageWrapper>
      {/* Criminal Section */}
      <div className="space-y-8">
        {/* Criminal's Last Known Location */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-start gap-8">
              <div className="flex items-center gap-6">
                <img
                  src={gameData.criminal?.imgSrc}
                  alt="Criminal"
                  className="w-24 h-24 object-contain rounded-lg"
                />
                <div className="relative">
                  <img
                    src={
                      gameData.criminal?.cityHiding
                        ? gameData.cities.find(
                            (c) => c.id === gameData.criminal?.cityHiding?.id
                          )?.imgSrc
                        : // TODO: Default image for unknown location
                          "/question-mark.png"
                    }
                    alt="Hidden Location"
                    className="w-32 h-32 object-cover rounded-lg filter blur-sm"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl font-bold text-white/50">?</span>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-red-500">
                  Criminal's Last Known Location
                </h2>
                <p className="text-slate-300 mt-2">
                  The criminal's whereabouts are unknown. Your team must
                  investigate the potential hideouts.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cops Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Investigation Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cops.map((cop) => (
              <CopCard key={cop.id} cop={cop} />
            ))}
          </div>
        </div>

        {/* Router Outlet for City/Vehicle Selection */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <Outlet />
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
}
