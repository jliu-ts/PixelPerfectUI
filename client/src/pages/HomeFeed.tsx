import React from "react";
import { useLocation } from "wouter";
import { Heart, MessageCircle, Share2, Repeat, Swords, Music2, Verified, Plus, Zap, Sparkles } from "lucide-react";
import { Layout } from "@/components/Layout";
import { GradientButton } from "@/components/GradientButton";
import { cn } from "@/lib/utils";
import bgImage from "@assets/generated_images/cosmic_space_nebula_background_for_video_placeholder.png";
import cyberpunkImage from "@assets/generated_images/cyberpunk_city_vertical_video_thumbnail.png";
import natureImage from "@assets/generated_images/nature_waterfall_vertical_video_thumbnail.png";

// Mock Feed Data
const FEED_ITEMS = [
  {
    id: 1,
    username: "cosmic_dreamer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    description: "Exploring the depths of the nebula with the new V4 model. The colors are absolutely insane! 🌌✨ #AIart #Space",
    likes: "4.2k",
    comments: "842",
    music: "Original Audio - cosmic_dreamer",
    image: bgImage,
    verified: true
  },
  {
    id: 2,
    username: "pixel_ninja",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ninja",
    description: "Cyberpunk cityscapes are my jam. Generated this in 4K using the new 'Neon Noir' preset. 🏙️🤖 #Cyberpunk #DigitalArt",
    likes: "12.5k",
    comments: "1.2k",
    music: "Cyber City - Neon Beats",
    image: cyberpunkImage,
    verified: false
  },
  {
    id: 3,
    username: "nature_whisperer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Annie",
    description: "Found this hidden waterfall in the latent space. 🌿💧 So peaceful. #Nature #AI #Relax",
    likes: "8.9k",
    comments: "560",
    music: "Forest Sounds - Nature",
    image: natureImage,
    verified: true
  }
];

// Mock Stories Data (Super App Channels)
const STORIES = [
  { id: "battle", type: "live", name: "Live Battle", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Battle" },
  { id: 1, type: "story", name: "Instagram", avatar: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png", hasNew: true },
  { id: 2, type: "story", name: "TikTok", avatar: "https://upload.wikimedia.org/wikipedia/commons/3/34/Ionicons_logo-tiktok.svg", hasNew: true },
  { id: 3, type: "story", name: "YouTube", avatar: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg", hasNew: false },
  { id: 4, type: "story", name: "OpenAI", avatar: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg", hasNew: true },
];

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
      {/* Top Stories Rail (Instagram/Snapchat Pattern) */}
      <div className="absolute top-0 left-0 right-0 z-30 pt-4 pb-2 bg-gradient-to-b from-black/90 to-transparent">
        <div className="flex gap-4 overflow-x-auto no-scrollbar px-4 pb-4 items-center">
          
          {/* Add Yours / Create */}
          <div className="flex flex-col items-center gap-1 min-w-[64px] cursor-pointer" onClick={() => setLocation("/create")}>
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors relative">
              <Plus size={24} className="text-white" />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border border-black">
                <Plus size={12} className="text-white" />
              </div>
            </div>
            <span className="text-[10px] text-gray-300 font-medium">Create</span>
          </div>

          {/* Live Battle (TikTok Live Pattern) */}
          <div className="flex flex-col items-center gap-1 min-w-[64px] cursor-pointer group" onClick={() => setLocation("/battle")}>
            <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-red-500 to-purple-600 animate-pulse relative">
              <div className="w-full h-full rounded-full border-2 border-black bg-gray-900 overflow-hidden relative">
                <img src={STORIES[0].avatar} className="w-full h-full object-cover opacity-80" />
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
                  <img src={story.avatar} className="w-full h-full rounded-full object-cover bg-white" />
                </div>
              </div>
              <span className="text-[10px] text-gray-300 font-medium truncate max-w-[64px]">{story.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feed Container - Snap Scrolling */}
      <div className="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black">
        
        {FEED_ITEMS.map((item) => (
          <div key={item.id} className="relative w-full h-[100dvh] snap-start bg-black overflow-hidden">
            {/* Background Image (Simulating Video) */}
            <img 
              src={item.image} 
              alt="Feed Content" 
              className="w-full h-full object-cover opacity-90"
            />
            
            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90 pointer-events-none" />

            {/* CapCut Style Template Button (Innovation) */}
            <div className="absolute left-4 bottom-40 z-20 md:left-8 md:bottom-32">
              <button 
                onClick={handleRemix}
                className="flex items-center gap-2 px-3 py-1.5 rounded bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/60 transition-colors"
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
                <div className="p-2 rounded-full bg-white/10 backdrop-blur-md group-hover:bg-white/20 transition-colors cursor-pointer active:scale-90 duration-200 md:p-3">
                  <Heart size={28} className="text-white group-hover:text-red-500 transition-colors md:w-8 md:h-8" />
                </div>
                <span className="text-xs font-medium drop-shadow-md text-white md:text-sm">{item.likes}</span>
              </div>

              <div className="flex flex-col items-center gap-1 group">
                 <div className="p-2 rounded-full bg-white/10 backdrop-blur-md group-hover:bg-white/20 transition-colors cursor-pointer active:scale-90 duration-200 md:p-3">
                  <MessageCircle size={28} className="text-white md:w-8 md:h-8" />
                </div>
                <span className="text-xs font-medium drop-shadow-md text-white md:text-sm">{item.comments}</span>
              </div>

              <div className="flex flex-col items-center gap-1 group">
                 <div className="p-2 rounded-full bg-white/10 backdrop-blur-md group-hover:bg-white/20 transition-colors cursor-pointer active:scale-90 duration-200 md:p-3">
                  <Share2 size={28} className="text-white md:w-8 md:h-8" />
                </div>
                <span className="text-xs font-medium drop-shadow-md text-white md:text-sm">Share</span>
              </div>
              
              <div className="flex flex-col items-center gap-1 mt-2">
                 <button 
                   onClick={handleRemix}
                   className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center animate-[spin_4s_linear_infinite] shadow-lg border-2 border-white/20"
                 >
                   <img src={item.avatar} className="w-6 h-6 md:w-8 md:h-8 rounded-full" />
                </button>
              </div>
            </div>

            {/* Bottom Overlay */}
            <div className="absolute bottom-20 left-4 right-16 z-20 text-left pointer-events-none md:left-8 md:right-24 md:bottom-12">
              <div className="flex items-center gap-2 mb-2 pointer-events-auto">
                <span className="font-bold text-white text-lg shadow-black drop-shadow-md flex items-center gap-1 md:text-xl">
                  @{item.username}
                  {item.verified && <Verified size={14} className="text-blue-400 md:w-5 md:h-5" />}
                </span>
              </div>
              <p className="text-white/90 text-sm leading-relaxed line-clamp-2 mb-3 drop-shadow-md max-w-[90%] pointer-events-auto md:text-base md:max-w-[80%]">
                {item.description}
              </p>
              
              <div className="flex items-center gap-2 text-white/80 text-xs font-medium mb-4 md:text-sm">
                 <Music2 size={12} className="md:w-4 md:h-4" />
                 <div className="overflow-hidden w-32 md:w-48">
                   <p className="whitespace-nowrap animate-marquee">{item.music}</p>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
