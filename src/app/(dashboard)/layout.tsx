"use client";

import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-dvh flex overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-scroll h-full bg-background">
        {children}
      </main>
    </div>
  );
}
