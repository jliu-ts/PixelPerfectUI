import React from "react";
import { Link } from "wouter";
import { Search, Bell } from "lucide-react";
import { BottomTabs } from "./BottomTabs";

interface LayoutProps {
  children: React.ReactNode;
  hideTabs?: boolean;
}

export function Layout({ children, hideTabs = false }: LayoutProps) {
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex justify-center overflow-hidden">
      <div className="w-full max-w-md h-full min-h-screen relative bg-background flex flex-col shadow-2xl overflow-hidden">
        
        {/* Top Navigation Overlay (Only show if tabs are visible, implying a main feed page) */}
        {!hideTabs && (
          <nav className="fixed top-0 max-w-md w-full z-50 p-4 flex justify-between items-center pointer-events-none">
            <div className="pointer-events-auto">
               {/* TS Logo Placeholder */}
            </div>
            
            <div className="flex gap-4 pointer-events-auto">
               <Link href="/search">
                 <div className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors cursor-pointer">
                    <Search size={20} />
                 </div>
               </Link>
               <Link href="/notifications">
                 <div className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors cursor-pointer relative">
                    <Bell size={20} />
                    <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-black" />
                 </div>
               </Link>
            </div>
          </nav>
        )}

        <main className="flex-1 relative overflow-y-auto no-scrollbar pb-24">
          {children}
        </main>
        {!hideTabs && <BottomTabs />}
      </div>
    </div>
  );
}
