import React from "react";
import { Link, useLocation } from "wouter";
import { Home, Search, Plus, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomTabs() {
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-background/95 backdrop-blur-md border-t border-white/5 flex items-center justify-around px-4 z-50 pb-4">
      <Link href="/">
        <div className={cn("flex flex-col items-center justify-center w-12 h-12 gap-1 transition-colors", isActive("/") ? "text-white" : "text-secondary")}>
          <Home size={24} strokeWidth={isActive("/") ? 2.5 : 2} className={isActive("/") ? "stroke-white" : "stroke-secondary"} />
          <span className="text-[10px] font-medium">Home</span>
        </div>
      </Link>

      <Link href="/search">
        <div className={cn("flex flex-col items-center justify-center w-12 h-12 gap-1 transition-colors", isActive("/search") ? "text-white" : "text-secondary")}>
          <Search size={24} strokeWidth={2} />
          <span className="text-[10px] font-medium">Search</span>
        </div>
      </Link>

      <Link href="/create">
        <div className="relative -top-4">
          <div className="w-16 h-16 rounded-full bg-gradient-accent flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-105 transition-transform active:scale-95">
            <Plus size={32} color="white" strokeWidth={3} />
          </div>
        </div>
      </Link>

      <Link href="/notifications">
        <div className={cn("flex flex-col items-center justify-center w-12 h-12 gap-1 transition-colors", isActive("/notifications") ? "text-white" : "text-secondary")}>
          <Bell size={24} strokeWidth={2} />
          <span className="text-[10px] font-medium">Alerts</span>
        </div>
      </Link>

      <Link href="/profile">
        <div className={cn("flex flex-col items-center justify-center w-12 h-12 gap-1 transition-colors", isActive("/profile") ? "text-white" : "text-secondary")}>
          <User size={24} strokeWidth={2} />
          <span className="text-[10px] font-medium">Profile</span>
        </div>
      </Link>
    </div>
  );
}
