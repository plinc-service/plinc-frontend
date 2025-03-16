"use client";

import AnalysisOfPlincChart from "@/components/dashboard/AnalysisOfPlincChart";
import PlincStatsCardWrapper from "@/components/dashboard/PlincStatsCardWrapper";
import StatistiquesCardWrapper from "@/components/dashboard/StatistiquesCardWrapper";
import TopBar from "@/components/layout/TopBar";
import { Separator } from "@/components/ui/Separator";

export default function DashboardPage() {
  return (
    <div className="px-5 py-5 flex flex-col h-full w-full">
      <TopBar pageName="Tableau de bord" />
      <div className="w-full h-full mt-4 space-y-5">
        {/* Plinc stats */}
        <div className="flex flex-col">
          <h2 className="text-lg font-medium text-neutral-high">Plinc</h2>
          <Separator className="my-2.5" />
          <PlincStatsCardWrapper />
        </div>

        {/* Statistiques */}
        <StatistiquesCardWrapper />
      </div>

      <div className="grid grid-cols-2 gap-5 mt-5 w-full">
        <AnalysisOfPlincChart />
      </div>
    </div>
  );
}
