import React from "react";
import { Link, useLocation } from "wouter";
import { Home, Search, Plus, Bell, User, Settings, Zap, ShoppingBag, Users, Store, Lightbulb, Briefcase, Library, Rss, Palette, BrainCircuit, Bot, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

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
        
        {/* Main */}
        <div className="space-y-1">
          <h3 className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Discover</h3>
          <Link href="/">
            <div className={cn("flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors cursor-pointer group", isActive("/") ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5")}>
              <Home size={20} />
              <span className="text-sm font-medium">Home Feed</span>
            </div>
          </Link>
          <Link href="/search">
            <div className={cn("flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors cursor-pointer group", isActive("/search") ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5")}>
              <Search size={20} />
              <span className="text-sm font-medium">Explore</span>
            </div>
          </Link>
          <Link href="/ideas">
            <div className={cn("flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors cursor-pointer group", isActive("/ideas") ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5")}>
              <Lightbulb size={20} />
              <span className="text-sm font-medium flex-1">Ideas</span>
              <span className="text-[8px] font-bold bg-accent/20 text-accent px-1.5 py-0.5 rounded">NEW</span>
            </div>
          </Link>
          <Link href="/marketplace">
            <div className={cn("flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors cursor-pointer group", isActive("/marketplace") ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5")}>
              <Store size={20} />
              <span className="text-sm font-medium">Marketplace</span>
            </div>
          </Link>
          <Link href="/feeds">
            <div className={cn("flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors cursor-pointer group", isActive("/feeds") ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5")}>
              <Rss size={20} />
              <span className="text-sm font-medium">My Feeds</span>
            </div>
          </Link>
        </div>

        {/* Creative Suite */}
        <div className="space-y-1">
          <h3 className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Creative Suite</h3>
          <Link href="/create">
            <div className={cn("flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all cursor-pointer group", isActive("/create") ? "bg-gradient-accent text-black font-bold shadow-lg" : "text-gray-400 hover:text-white hover:bg-white/5")}>
              <Plus size={20} />
              <span className="text-sm font-medium">Studio</span>
            </div>
          </Link>
          <Link href="/library">
            <div className={cn("flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors cursor-pointer group", isActive("/library") ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5")}>
              <Library size={20} />
              <span className="text-sm font-medium">Prompt Library</span>
            </div>
          </Link>
          <Link href="/brand">
            <div className={cn("flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors cursor-pointer group", isActive("/brand") ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5")}>
              <Palette size={20} />
              <span className="text-sm font-medium">Brand Kit</span>
            </div>
          </Link>
          <Link href="/avatars">
            <div className={cn("flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors cursor-pointer group", isActive("/avatars") ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5")}>
              <User size={20} />
              <span className="text-sm font-medium">Avatars</span>
            </div>
          </Link>
          <Link href="/context">
            <div className={cn("flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors cursor-pointer group", isActive("/context") ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5")}>
              <BrainCircuit size={20} />
              <span className="text-sm font-medium">Context</span>
            </div>
          </Link>
          <Link href="/research">
            <div className={cn("flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors cursor-pointer group", isActive("/research") ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5")}>
              <Bot size={20} />
              <span className="text-sm font-medium">AI Agent</span>
            </div>
          </Link>
          <Link href="/collab">
            <div className={cn("flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors cursor-pointer group", isActive("/collab") ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5")}>
              <Users size={20} />
              <span className="text-sm font-medium">Collab Room</span>
            </div>
          </Link>
        </div>

        {/* Personal */}
        <div className="space-y-1">
          <h3 className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Me</h3>
          <Link href="/profile">
            <div className={cn("flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors cursor-pointer group", isActive("/profile") ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5")}>
              <User size={20} />
              <span className="text-sm font-medium">Profile</span>
            </div>
          </Link>
          <Link href="/affiliate">
            <div className={cn("flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors cursor-pointer group", isActive("/affiliate") ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5")}>
              <Briefcase size={20} />
              <span className="text-sm font-medium">Creator Hub</span>
            </div>
          </Link>
          <Link href="/notifications">
            <div className={cn("flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors cursor-pointer group", isActive("/notifications") ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5")}>
              <Bell size={20} />
              <span className="text-sm font-medium flex-1">Alerts</span>
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
            </div>
          </Link>
          <Link href="/store">
            <div className={cn("flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors cursor-pointer group", isActive("/store") ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5")}>
              <ShoppingBag size={20} />
              <span className="text-sm font-medium">My Store</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Bottom Stats/Actions */}
      <div className="mt-auto pt-6 border-t border-white/5">
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
