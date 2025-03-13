"use client";

import { AuthWrapper } from "@/components/guard/AuthGuard";
import { Sidebar } from "@/components/layout/Sidebar";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthWrapper>
      <div className="w-full h-dvh flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-scroll h-full bg-background">
          {children}
        </main>
        <Toaster richColors closeButton />
      </div>
    </AuthWrapper>
  );
}
