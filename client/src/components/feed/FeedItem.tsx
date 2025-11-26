import React from "react";
import { Heart, MessageCircle, Share2, Sparkles, Plus, Verified, Music2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { FEED_ITEMS } from "@/lib/mockData";

interface FeedItemProps {
  item: typeof FEED_ITEMS[0];
  isLiked: boolean;
  likeCount: number;
  onToggleLike: (id: number) => void;
  onComment: (id: number) => void;
  onRemix: () => void;
}

export function FeedItem({ item, isLiked, likeCount, onToggleLike, onComment, onRemix }: FeedItemProps) {
  const formatNumber = (num: number) => {
    return num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num.toString();
  };

  return (
    <div className="relative w-full h-[100dvh] snap-start bg-black overflow-hidden">
      {/* Background Image (Simulating Video) */}
      <img 
        src={item.image} 
        alt="Feed Content" 
        className="w-full h-full object-cover opacity-90"
      />
      
      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90 pointer-events-none" />

      {/* CapCut Style Template Button (Innovation) */}
      <div className="absolute left-4 top-24 z-20 md:left-8">
        <button 
          onClick={onRemix}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/60 transition-colors"
        >
          <Sparkles size={12} className="text-yellow-400" />
          <span className="text-[10px] font-bold text-white md:text-xs">Try this Style</span>
        </button>
      </div>

      {/* Right Sidebar Actions */}
      <div className="absolute right-4 bottom-28 flex flex-col items-center gap-6 z-20 md:right-8 md:bottom-32 md:gap-8">
        <div className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white p-0.5 mb-2 relative transition-transform hover:scale-110">
            <img src={item.avatar} alt="User" className="w-full h-full rounded-full bg-white/20" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-500 rounded-full p-0.5 border border-black cursor-pointer hover:bg-red-600">
              <Plus size={10} className="text-white md:w-3 md:h-3" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1 group">
          <div 
            onClick={() => onToggleLike(item.id)}
            className="p-2 rounded-full bg-white/10 backdrop-blur-md group-hover:bg-white/20 transition-colors cursor-pointer active:scale-90 duration-200 md:p-3"
          >
            <Heart 
              size={28} 
              className={cn(
                "transition-colors md:w-8 md:h-8",
                isLiked ? "fill-red-500 text-red-500" : "text-white group-hover:text-red-500"
              )} 
            />
          </div>
          <span className="text-xs font-medium drop-shadow-md text-white md:text-sm">
            {formatNumber(likeCount)}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1 group">
           <div 
             onClick={() => onComment(item.id)}
             className="p-2 rounded-full bg-white/10 backdrop-blur-md group-hover:bg-white/20 transition-colors cursor-pointer active:scale-90 duration-200 md:p-3"
           >
            <MessageCircle size={28} className="text-white md:w-8 md:h-8" />
          </div>
          <span className="text-xs font-medium drop-shadow-md text-white md:text-sm">
            {formatNumber(item.comments)}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1 group">
           <div className="p-2 rounded-full bg-white/10 backdrop-blur-md group-hover:bg-white/20 transition-colors cursor-pointer active:scale-90 duration-200 md:p-3">
            <Share2 size={28} className="text-white md:w-8 md:h-8" />
          </div>
          <span className="text-xs font-medium drop-shadow-md text-white md:text-sm">Share</span>
        </div>
        
        <div className="flex flex-col items-center gap-1 mt-2">
           <button 
             onClick={onRemix}
             className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center animate-[spin_4s_linear_infinite] shadow-lg border-2 border-white/20"
           >
             <img src={item.avatar} className="w-6 h-6 md:w-8 md:h-8 rounded-full" />
          </button>
        </div>
      </div>

      {/* Bottom Overlay */}
      <div className="absolute bottom-20 left-4 right-16 z-20 text-left pointer-events-none md:left-8 md:right-24 md:bottom-12 flex flex-col items-start max-w-[70%] md:max-w-[60%]">
        <div className="flex items-center gap-2 mb-2 pointer-events-auto">
          <span className="font-bold text-white text-lg shadow-black drop-shadow-md flex items-center gap-1 md:text-xl">
            @{item.username}
            {item.verified && <Verified size={14} className="text-blue-400 md:w-5 md:h-5" />}
          </span>
        </div>
        <p className="text-white/90 text-sm leading-relaxed line-clamp-3 mb-3 drop-shadow-md pointer-events-auto md:text-base">
          {item.description}
        </p>
        
        <div className="flex items-center gap-2 text-white/80 text-xs font-medium mb-4 md:text-sm bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/5 pointer-events-auto">
           <Music2 size={12} className="md:w-4 md:h-4" />
           <div className="overflow-hidden w-32 md:w-48">
             <p className="whitespace-nowrap animate-marquee">{item.music}</p>
           </div>
        </div>
      </div>
    </div>
  );
}
