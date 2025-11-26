import React from "react";
import { Link } from "wouter";
import { Search, Bell } from "lucide-react";
import { BottomTabs } from "./BottomTabs";
import { Sidebar } from "./Sidebar";

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
      <div className="flex-1 flex justify-center relative h-screen overflow-hidden">
        <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl h-full min-h-screen relative bg-background flex flex-col shadow-2xl overflow-hidden md:border-x md:border-white/5">
          
          {/* Top Navigation Overlay (Mobile Only) */}
          {!hideTabs && (
            <nav className="md:hidden fixed top-0 max-w-md w-full z-50 p-4 flex justify-between items-center pointer-events-none">
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
            {children}
          </main>
          {!hideTabs && <div className="md:hidden"><BottomTabs /></div>}
        </div>

        {/* Desktop Right Sidebar (Widgets) - Optional, keeps centered content focused */}
        <div className="hidden lg:flex flex-col w-80 h-screen sticky top-0 border-l border-white/5 bg-black/95 p-6">
           <div className="mb-8">
             <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">Trending Now</h3>
             <div className="space-y-4">
               {["#Cyberpunk", "#AIArt", "#FutureBass", "#Neon"].map(tag => (
                 <div key={tag} className="flex justify-between items-center group cursor-pointer">
                   <span className="text-sm font-medium text-white group-hover:text-accent transition-colors">{tag}</span>
                   <span className="text-xs text-gray-500">12.5k posts</span>
                 </div>
               ))}
             </div>
           </div>

           <div className="p-4 rounded-xl bg-white/5 border border-white/10">
             <h3 className="text-sm font-bold text-white mb-2">Go Pro</h3>
             <p className="text-xs text-gray-400 mb-3">Unlock analytics, 0% fees, and custom branding.</p>
             <button className="w-full py-2 rounded-lg bg-white text-black text-xs font-bold hover:bg-gray-200 transition-colors">
               Upgrade
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}
