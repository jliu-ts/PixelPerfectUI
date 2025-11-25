import React from "react";
import { useLocation } from "wouter";
import { Heart, MessageCircle, Share2, Repeat, Swords } from "lucide-react";
import { Layout } from "@/components/Layout";
import { GradientButton } from "@/components/GradientButton";
import bgImage from "@assets/generated_images/cosmic_space_nebula_background_for_video_placeholder.png";

export default function HomeFeed() {
  const [, setLocation] = useLocation();

  const handleRemix = () => {
    setLocation("/create", { 
      state: { 
        prompt: "Exploring the depths of the nebula with the new V4 model. The colors are absolutely insane! 🌌✨ #AIart #Space",
        style: "Cinematic"
      } 
    });
  };

  return (
    <Layout>
      {/* Battle Mode Banner (Floating) */}
      <div 
        onClick={() => setLocation("/battle")}
        className="absolute top-20 left-4 right-4 z-30 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-3 flex items-center justify-between animate-in slide-in-from-top-4 fade-in duration-700 cursor-pointer hover:bg-black/80 transition-colors group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.4)]">
            <Swords size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Daily Battle 
              <span className="text-[10px] px-1.5 py-0.5 bg-red-500 rounded text-white font-bold animate-pulse">LIVE</span>
            </h3>
            <p className="text-xs text-gray-300">Samurai vs Elf • Win 50 XP</p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
          <span className="text-lg">👉</span>
        </div>
      </div>

      {/* Full Screen Feed Item */}
      <div className="relative w-full h-[100dvh] bg-black">
        {/* Background Image (Simulating Video) */}
        <img 
          src={bgImage} 
          alt="Cosmic Nebula" 
          className="w-full h-full object-cover opacity-90"
        />
        
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />

        {/* Floating Header */}
        <div className="absolute top-0 left-0 right-0 pt-12 pb-4 px-6 flex justify-between items-center z-20 pointer-events-none">
          <h1 className="text-xl font-display font-bold tracking-wide text-white drop-shadow-lg">Trending Society</h1>
          {/* Spacer to balance layout since nav icons are overlayed */}
          <div className="w-8" />
        </div>

        {/* Right Sidebar Actions */}
        <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6 z-20">
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-full border-2 border-white p-0.5 mb-2">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full rounded-full bg-white/20" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors">
              <Heart size={28} className="text-white" fill="rgba(255,255,255,0.2)" />
            </div>
            <span className="text-xs font-medium drop-shadow-md">4.2k</span>
          </div>

          <div className="flex flex-col items-center gap-1">
             <div className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors">
              <MessageCircle size={28} className="text-white" />
            </div>
            <span className="text-xs font-medium drop-shadow-md">842</span>
          </div>

          <div className="flex flex-col items-center gap-1">
             <div className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors">
              <Share2 size={28} className="text-white" />
            </div>
            <span className="text-xs font-medium drop-shadow-md">Share</span>
          </div>
          
          <div className="flex flex-col items-center gap-1 mt-2">
             <button 
               onClick={handleRemix}
               className="p-2 rounded-full bg-gradient-to-tr from-purple-600/80 to-cyan-500/80 backdrop-blur-md hover:scale-110 transition-transform"
             >
              <Repeat size={24} className="text-white" />
            </button>
             <span className="text-[10px] font-medium drop-shadow-md">Remix</span>
          </div>
        </div>

        {/* Bottom Overlay */}
        <div className="absolute bottom-24 left-4 right-16 z-20 text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-white text-lg shadow-black drop-shadow-md">@cosmic_dreamer</span>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full text-white backdrop-blur-sm">Following</span>
          </div>
          <p className="text-white/90 text-sm leading-relaxed line-clamp-2 mb-4 drop-shadow-md max-w-[85%]">
            Exploring the depths of the nebula with the new V4 model. The colors are absolutely insane! 🌌✨ #AIart #Space
          </p>
          
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/40 border border-white/10 backdrop-blur-lg hover:bg-black/60 transition-colors group">
            <div className="w-4 h-4 rounded-full bg-gradient-accent opacity-70 group-hover:opacity-100 transition-opacity" />
            <span className="text-xs font-medium text-white/90">View Prompt Details</span>
          </button>
        </div>
      </div>
    </Layout>
  );
}
