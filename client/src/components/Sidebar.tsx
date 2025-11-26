import React from "react";
import { Link, useLocation } from "wouter";
import { Settings, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { SIDEBAR_NAVIGATION } from "@/lib/mockData";

export function Sidebar() {
  const [location] = useLocation();
  const isActive = (path: string) => location === path;

  return (
    <div className="hidden md:flex flex-col w-64 h-screen sticky top-0 border-r border-white/5 bg-black/95 p-4">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 mb-8 mt-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center font-display font-bold text-black text-lg shadow-[0_0_20px_rgba(124,58,237,0.5)]">
          TS
        </div>
        <span className="font-display font-bold text-xl text-white tracking-wide">Trending Society</span>
      </div>

      {/* Navigation Groups */}
      <div className="flex flex-col gap-6 flex-1 overflow-y-auto no-scrollbar">
        
        {SIDEBAR_NAVIGATION.map((group, index) => (
          <div key={index} className="space-y-1">
            <h3 className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">{group.title}</h3>
            {group.items.map((item: any) => (
              <Link key={item.href} href={item.href}>
                <div className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors cursor-pointer group",
                  isActive(item.href) 
                    ? (item.highlight ? "bg-gradient-accent text-black font-bold shadow-lg" : "bg-white/10 text-white") 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}>
                  <item.icon size={20} />
                  <span className="text-sm font-medium flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="text-[8px] font-bold bg-accent/20 text-accent px-1.5 py-0.5 rounded">{item.badge}</span>
                  )}
                  {item.indicator && (
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* Pro Upgrade Card (Moved from Right Sidebar) */}
      <div className="mt-4 mb-4 p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-10 transition-opacity" />
        <h3 className="text-xs font-bold text-white mb-1 relative z-10">Unlock Creator Pro</h3>
        <p className="text-[10px] text-gray-400 mb-3 relative z-10 leading-relaxed">
          Get advanced analytics & 0% platform fees.
        </p>
        <button className="w-full py-2 rounded-lg bg-white text-black text-[10px] font-bold hover:bg-gray-200 transition-colors relative z-10 flex items-center justify-center gap-1">
          Upgrade Now
        </button>
      </div>

      {/* Bottom Stats/Actions */}
      <div className="pt-4 border-t border-white/5">
         <Link href="/wallet">
           <div className="px-4 py-3 rounded-xl bg-white/5 mb-2 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors">
             <div className="flex items-center gap-2">
               <Zap size={16} className="text-yellow-400" fill="currentColor" />
               <span className="text-xs font-bold text-white">320 Credits</span>
             </div>
             <span className="text-[10px] text-accent hover:underline">Top Up</span>
           </div>
         </Link>
         
         <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-colors w-full text-left">
           <Settings size={20} />
           <span className="text-sm font-medium">Settings</span>
         </button>
      </div>
    </div>
  );
}
