import React from "react";
import { Link, useLocation } from "wouter";
import { Search, Bell, Plus, TrendingUp, Zap, Newspaper, ChevronRight } from "lucide-react";
import { BottomTabs } from "./BottomTabs";
import { Sidebar } from "./Sidebar";
import { AppBreadcrumbs } from "./Breadcrumbs";
import { MOCK_ARTICLES } from "@/lib/mockData";

interface LayoutProps {
  children: React.ReactNode;
  hideTabs?: boolean;
}

export function Layout({ children, hideTabs = false }: LayoutProps) {
  const [, setLocation] = useLocation();
  
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
        <div className="hidden lg:flex flex-col w-80 h-screen sticky top-0 border-l border-white/5 bg-[#0A0A0A] p-6 overflow-y-auto no-scrollbar">
           
           {/* Quick Create Widget */}
           <div className="mb-8">
             <h3 className="text-xs font-bold text-gray-500 uppercase mb-4 tracking-wider flex items-center gap-2">
               <Zap size={14} className="text-yellow-400" /> Quick Actions
             </h3>
             <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setLocation("/create")}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-accent/30 transition-all text-left group"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-accent flex items-center justify-center mb-2 text-black group-hover:scale-110 transition-transform">
                    <Plus size={16} />
                  </div>
                  <span className="text-xs font-bold text-white block">New Post</span>
                </button>
                <button 
                  onClick={() => setLocation("/podcast/studio")}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-orange-400/30 transition-all text-left group"
                >
                  <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center mb-2 text-black group-hover:scale-110 transition-transform">
                    <TrendingUp size={16} />
                  </div>
                  <span className="text-xs font-bold text-white block">Analysis</span>
                </button>
             </div>
           </div>

           {/* Trending Articles Widget */}
           <div className="mb-8 flex-1">
             <div className="flex items-center justify-between mb-4">
               <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                 <Newspaper size={14} className="text-blue-400" /> Trending News
               </h3>
               <button onClick={() => setLocation("/feeds")} className="text-[10px] text-accent hover:underline">View All</button>
             </div>
             <div className="space-y-3">
               {MOCK_ARTICLES.slice(0, 3).map((article) => (
                 <button 
                   key={article.id}
                   onClick={() => setLocation("/create")} // In real app, pass context
                   className="w-full flex gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 transition-all group text-left"
                 >
                   <div className="w-16 h-16 rounded-lg bg-gray-800 overflow-hidden flex-shrink-0">
                     <img src={article.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                   </div>
                   <div className="flex-1 min-w-0">
                     <span className="text-[9px] font-bold text-blue-400 mb-1 block">{article.source}</span>
                     <h4 className="text-xs font-bold text-white leading-snug line-clamp-2 mb-1 group-hover:text-accent transition-colors">
                       {article.title}
                     </h4>
                     <span className="text-[10px] text-gray-500">{article.time}</span>
                   </div>
                 </button>
               ))}
             </div>
           </div>

           {/* Pro Upgrade Card */}
           <div className="mt-auto p-5 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-10 transition-opacity" />
             <h3 className="text-sm font-bold text-white mb-2 relative z-10">Unlock Creator Pro</h3>
             <p className="text-xs text-gray-400 mb-4 relative z-10 leading-relaxed">
               Get advanced analytics, AI brand voice cloning, and 0% platform fees.
             </p>
             <button className="w-full py-2.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-gray-200 transition-colors relative z-10 flex items-center justify-center gap-2">
               Upgrade Now <ChevronRight size={12} />
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}
