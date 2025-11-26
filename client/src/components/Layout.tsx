import React from "react";
import { Link } from "wouter";
import { Search, Bell } from "lucide-react";
import { BottomTabs } from "./BottomTabs";
import { Sidebar } from "./Sidebar";
import { AppBreadcrumbs } from "./Breadcrumbs";
import { RightSidebar } from "./layout/RightSidebar";

interface LayoutProps {
  children: React.ReactNode;
  hideTabs?: boolean;
}

export function Layout({ children, hideTabs = false }: LayoutProps) {
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex justify-center md:justify-start overflow-hidden">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex relative h-screen overflow-hidden">
        <div className="flex-1 w-full h-full min-h-screen relative bg-background flex flex-col overflow-hidden">
          
          {/* Top Navigation Overlay (Mobile Only) */}
          {!hideTabs && (
            <nav className="md:hidden fixed top-0 w-full z-50 p-4 flex justify-between items-center pointer-events-none">
              <div className="pointer-events-auto flex items-center gap-2">
                 <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center font-display font-bold text-black text-sm shadow-[0_0_15px_rgba(124,58,237,0.5)]">
                   TS
                 </div>
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

          <main className="flex-1 relative overflow-y-auto no-scrollbar pb-24 md:pb-0 h-full">
            <div className="hidden md:block pt-4">
              <AppBreadcrumbs />
            </div>
            {children}
          </main>
          {!hideTabs && <div className="md:hidden"><BottomTabs /></div>}
        </div>

        {/* Desktop Right Sidebar (Widgets) */}
        <RightSidebar />
      </div>
    </div>
  );
}
