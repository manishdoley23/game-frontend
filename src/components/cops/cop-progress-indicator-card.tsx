import { useGameStore } from "@/lib/store";
import { LoadingSpinner } from "../ui/loading-spinner";

export default function CopProgressIndicatorCard() {
  const cops = useGameStore((state) => state.cops);
  const currentCopIndex = useGameStore((state) => state.currentCopIndex);

  if (!cops) return <LoadingSpinner />;

  return (
    <div className="flex justify-between items-center mt-6">
      {cops.map((cop, index) => (
        <div
          key={cop.id}
          className={`flex-1 h-2 mx-1 rounded ${
            index < currentCopIndex
              ? "bg-green-500"
              : index === currentCopIndex
              ? "bg-purple-500"
              : "bg-slate-700"
          }`}
        />
      ))}
    </div>
  );
}
