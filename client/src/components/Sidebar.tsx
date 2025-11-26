import React from "react";
import { Link, useLocation } from "wouter";
import { Home, Search, Plus, Bell, User, Settings, LogOut, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [location] = useLocation();
  const isActive = (path: string) => location === path;

  const NAV_ITEMS = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/search", icon: Search, label: "Search" },
    { path: "/create", icon: Plus, label: "Create", highlight: true },
    { path: "/notifications", icon: Bell, label: "Notifications" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 h-screen sticky top-0 border-r border-white/5 bg-black/95 p-4">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 mb-8 mt-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center font-display font-bold text-black text-lg shadow-[0_0_20px_rgba(124,58,237,0.5)]">
          TS
        </div>
        <span className="font-display font-bold text-xl text-white tracking-wide">Trending Society</span>
      </div>

      {/* Navigation */}
      <div className="flex flex-col gap-2 flex-1">
        {NAV_ITEMS.map((item) => (
          <Link key={item.path} href={item.path}>
            <div 
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all cursor-pointer group",
                isActive(item.path) 
                  ? "bg-white/10 text-white" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white",
                item.highlight && "bg-gradient-accent text-black hover:bg-white hover:scale-105 font-bold mt-4 justify-center shadow-lg"
              )}
            >
              <item.icon 
                size={24} 
                strokeWidth={isActive(item.path) || item.highlight ? 2.5 : 2} 
                className={cn(
                  "transition-colors",
                  item.highlight ? "text-black" : (isActive(item.path) ? "text-white" : "text-gray-400 group-hover:text-white")
                )} 
              />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom Stats/Actions */}
      <div className="mt-auto pt-6 border-t border-white/5">
         <div className="px-4 py-3 rounded-xl bg-white/5 mb-4 flex items-center justify-between">
           <div className="flex items-center gap-2">
             <Zap size={16} className="text-yellow-400" fill="currentColor" />
             <span className="text-xs font-bold text-white">320 Credits</span>
           </div>
           <button className="text-[10px] text-accent hover:underline">Top Up</button>
         </div>
         
         <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-colors w-full text-left">
           <Settings size={20} />
           <span className="text-sm font-medium">Settings</span>
         </button>
      </div>
    </div>
  );
}
