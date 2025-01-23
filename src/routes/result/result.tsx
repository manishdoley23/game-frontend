import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageWrapper from "@/components/ui/page-wrapper";
import { useGameStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { resetGame } from "@/data/api";

export default function Result() {
  const navigate = useNavigate();
  const investigationResult = useGameStore(
    (state) => state.investigationResult
  );

  if (!investigationResult) {
    navigate("/");
    return null;
  }

  const { success, message, winner, hints, gameStatus } = investigationResult;

  const resetGameHandler = async () => {
    await resetGame();
    navigate("/");
  };

  return (
    <PageWrapper>
      <div className="space-y-8">
        {/* Result Header */}
        <div
          className={`text-center space-y-4 p-6 rounded-lg ${
            success ? "bg-green-500/20" : "bg-red-500/20"
          }`}
        >
          <h1
            className={`text-4xl md:text-6xl font-bold ${
              success ? "text-green-400" : "text-red-400"
            }`}
          >
            {success ? "Mission Accomplished!" : "Mission Failed!"}
          </h1>
          <p className="text-xl text-slate-300">{message}</p>
        </div>

        {/* Criminal Location Card */}
        <Card className="bg-slate-800/50 border-slate-700 text-slate-400">
          <CardHeader>
            <CardTitle className="text-2xl">Criminal's Location</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-6 flex-col md:flex-row">
            <div className="relative w-32 h-32">
              <img
                src={gameStatus?.criminal.imgSrc}
                alt="Criminal"
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-bold text-purple-400">
                {gameStatus?.correctCity}
              </h3>
              <p className="text-slate-300">
                Required Vehicle Range: {gameStatus?.requiredRange}km (Round
                Trip)
              </p>
            </div>
            <div className="w-32 h-32">
              <img
                src={gameStatus?.criminal.cityHiding?.imgSrc}
                alt="Hideout"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Winner or Hints Section */}
        {success ? (
          <Card className="bg-slate-800/50 border-slate-700 text-slate-400">
            <CardHeader>
              <CardTitle className="text-xl">Successful Capture</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-6">
              <img
                src={winner?.imgSrc}
                alt={winner?.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-bold text-green-400">
                  {winner?.name}
                </h3>
                <p className="text-slate-300">
                  Vehicle: {winner?.selectedVehicle?.name} (Range:{" "}
                  {winner?.selectedVehicle?.range}km)
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-slate-800/50 border-slate-700 text-slate-400">
            <CardHeader>
              <CardTitle className="text-xl">Investigation Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {hints?.map((hint, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-lg bg-slate-700/50"
                >
                  <Badge
                    variant="outline"
                    className="h-8 w-8 rounded-full text-slate-400"
                  >
                    {index + 1}
                  </Badge>
                  <p className="text-slate-300">{hint}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center">
          <Button
            onClick={resetGameHandler}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            Play Again
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}
