import React from "react";
import { BottomTabs } from "./BottomTabs";

interface LayoutProps {
  children: React.ReactNode;
  hideTabs?: boolean;
}

export function Layout({ children, hideTabs = false }: LayoutProps) {
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex justify-center overflow-hidden">
      <div className="w-full max-w-md h-full min-h-screen relative bg-background flex flex-col shadow-2xl overflow-hidden">
        <main className="flex-1 relative overflow-y-auto no-scrollbar pb-24">
          {children}
        </main>
        {!hideTabs && <BottomTabs />}
      </div>
    </div>
  );
}
