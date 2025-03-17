"use client";

import TopBar from "@/components/layout/TopBar";
import PlincsTableWrapper from "./components/PlincsTableWrapper";

export default function Plinc() {
  return (
    <div className="px-5 pt-5 flex flex-col h-full w-full">
      <TopBar pageName="PlinC" />
      <div className="w-full h-full mt-4">
        <PlincsTableWrapper />
      </div>
    </div>
  );
}
