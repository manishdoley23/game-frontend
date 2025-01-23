import { Outlet, useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import PageWrapper from "@/components/ui/page-wrapper";
import CopCard from "@/components/cops/cop-card";
import { useGameStore } from "@/lib/store";
import LoadingPage from "@/components/ui/loading-page";
import { useEffect } from "react";

export default function GameLayout() {
  const navigate = useNavigate();
  const criminal = useGameStore((state) => state.criminal);
  const cities = useGameStore((state) => state.cities);
  const cops = useGameStore((state) => state.cops);

  useEffect(() => {
    if (!criminal || !cities || !cops) {
      navigate("/");
    }
  }, [cities, cops, criminal, navigate]);

  if (!criminal || !cities || !cops) {
    return <LoadingPage />;
  }

  return (
    <PageWrapper>
      {/* Criminal Section */}
      <div className="space-y-8">
        {/* Criminal's Last Known Location */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex flex-col items-start gap-8 md:flex-row">
              <div className="flex items-center gap-6">
                <img
                  src={criminal?.imgSrc}
                  alt="Criminal"
                  className="w-24 h-24 object-contain rounded-lg"
                />
                <div className="relative">
                  <img
                    src={
                      criminal?.cityHiding
                        ? cities.find((c) => c.id === criminal?.cityHiding?.id)
                            ?.imgSrc
                        : ""
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
