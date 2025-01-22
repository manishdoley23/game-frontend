import { useNavigate } from "react-router";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function Hero({
  criminalImage,
}: {
  criminalImage: string | undefined;
}) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 py-12">
      <div className="flex-1 space-y-6">
        <Badge className="bg-red-500 hover:bg-red-600">
          ALERT: Criminal on the Loose!
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Operation: Cyber Chase
        </h1>
        <p className="text-lg text-slate-300">
          A notorious escape artist is hiding in one of our five futuristic
          cities. Lead a team of three skilled officers to track down and
          capture the fugitive.
        </p>
        <Button
          size="lg"
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          onClick={() => navigate("/game/select-city")}
        >
          Start Mission
        </Button>
      </div>
      {criminalImage && (
        <div className="flex-1 flex justify-center">
          <img
            src={criminalImage}
            alt="Criminal"
            className="w-64 h-64 object-contain drop-shadow-[0_0_15px_rgba(255,0,0,0.3)]"
          />
        </div>
      )}
    </div>
  );
}
