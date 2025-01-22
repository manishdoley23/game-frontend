import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const gameRules = [
  "Lead a team of three skilled officers",
  "Each officer must choose a unique city to investigate",
  "Select appropriate electric vehicles based on distance",
  "Vehicles must have sufficient range for a round trip",
];

export default function GameRules() {
  const navigate = useNavigate();

  return (
    <Card className="bg-slate-800/50 border-slate-700 mt-8 text-slate-400">
      <CardHeader>
        <CardTitle>Mission Briefing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <GameRulesContent rules={gameRules} />
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          onClick={() => navigate("/game/select-city")}
        >
          Accept Mission
        </Button>
      </CardFooter>
    </Card>
  );
}

const GameRulesContent = ({ rules }: { rules: string[] }) => (
  <div className="space-y-2">
    <h3 className="font-semibold">Your Task:</h3>
    <ul className="list-disc pl-5 text-slate-300">
      {rules.map((rule, index) => (
        <li key={index}>{rule}</li>
      ))}
    </ul>
  </div>
);
