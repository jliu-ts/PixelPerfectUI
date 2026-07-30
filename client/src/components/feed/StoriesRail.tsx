import React from "react";
import { useLocation } from "wouter";
import { Plus, Swords } from "lucide-react";
import { clickable, cn } from "@/lib/utils";
import { STORIES } from "@/lib/mockData";

export function StoriesRail() {
  const [, setLocation] = useLocation();

  return (
    <div className="absolute top-0 left-0 right-0 z-30 pt-6 pb-8 bg-gradient-to-b from-black/90 via-black/50 to-transparent pointer-events-none">
      <div className="flex gap-4 overflow-x-auto no-scrollbar px-4 items-center pointer-events-auto">
        
        {/* Add Yours / Create */}
        <div className="flex flex-col items-center gap-1 min-w-[64px] cursor-pointer" {...clickable(() => setLocation("/create"))}>
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors relative">
            <Plus size={24} className="text-white" />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border border-black">
              <Plus size={12} className="text-white" />
            </div>
          </div>
          <span className="text-[10px] text-gray-300 font-medium">Create</span>
        </div>

        {/* Live Battle (TikTok Live Pattern) */}
        <div className="flex flex-col items-center gap-1 min-w-[64px] cursor-pointer group" {...clickable(() => setLocation("/battle"))}>
          <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-red-500 to-purple-600 animate-pulse relative">
            <div className="w-full h-full rounded-full border-2 border-black bg-gray-900 overflow-hidden relative">
              <img alt="" loading="lazy" decoding="async" src={STORIES[0].avatar} className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <Swords size={20} className="text-white" />
              </div>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-500 px-2 py-0.5 rounded text-[8px] font-bold text-white uppercase tracking-wider border border-black shadow-lg">
              LIVE
            </div>
          </div>
          <span className="text-[10px] text-white font-bold">Battle</span>
        </div>

        {/* Stories (Model Updates) */}
        {STORIES.slice(1).map(story => (
          <div key={story.id} className="flex flex-col items-center gap-1 min-w-[64px] cursor-pointer group">
            <div className={cn(
              "w-16 h-16 rounded-full p-[2px] relative transition-transform group-active:scale-95",
              story.hasNew ? "bg-gradient-accent" : "bg-white/20"
            )}>
              <div className="w-full h-full rounded-full border-2 border-black bg-black overflow-hidden p-0.5">
                <img alt="" loading="lazy" decoding="async" src={story.avatar} className="w-full h-full rounded-full object-cover bg-white" />
              </div>
            </div>
            <span className="text-[10px] text-gray-300 font-medium truncate max-w-[64px]">{story.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
