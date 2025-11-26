import React from "react";
import { useLocation } from "wouter";
import { Heart, MessageCircle, Share2, Repeat, Swords, Music2, Verified } from "lucide-react";
import { Layout } from "@/components/Layout";
import { GradientButton } from "@/components/GradientButton";
import bgImage from "@assets/generated_images/cosmic_space_nebula_background_for_video_placeholder.png";

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
    image: "https://picsum.photos/seed/cyber/400/800", // Placeholder
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
    image: "https://picsum.photos/seed/nature/400/800", // Placeholder
    verified: true
  }
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
      {/* Battle Mode Banner (Floating) */}
      <div 
        onClick={() => setLocation("/battle")}
        className="fixed top-20 left-4 right-4 z-30 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-3 flex items-center justify-between animate-in slide-in-from-top-4 fade-in duration-700 cursor-pointer hover:bg-black/80 transition-colors group max-w-[calc(100%-32px)] mx-auto md:max-w-[416px]"
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
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90" />

            {/* Right Sidebar Actions */}
            <div className="absolute right-4 bottom-28 flex flex-col items-center gap-6 z-20">
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full border-2 border-white p-0.5 mb-2 relative">
                  <img src={item.avatar} alt="User" className="w-full h-full rounded-full bg-white/20" />
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-500 rounded-full p-0.5 border border-black">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-1">
                <div className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors cursor-pointer active:scale-90 duration-200">
                  <Heart size={28} className="text-white" />
                </div>
                <span className="text-xs font-medium drop-shadow-md text-white">{item.likes}</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                 <div className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors cursor-pointer active:scale-90 duration-200">
                  <MessageCircle size={28} className="text-white" />
                </div>
                <span className="text-xs font-medium drop-shadow-md text-white">{item.comments}</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                 <div className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors cursor-pointer active:scale-90 duration-200">
                  <Share2 size={28} className="text-white" />
                </div>
                <span className="text-xs font-medium drop-shadow-md text-white">Share</span>
              </div>
              
              <div className="flex flex-col items-center gap-1 mt-2">
                 <button 
                   onClick={handleRemix}
                   className="p-2 rounded-full bg-gradient-to-tr from-purple-600/80 to-cyan-500/80 backdrop-blur-md hover:scale-110 transition-transform animate-pulse"
                 >
                  <Repeat size={24} className="text-white" />
                </button>
                 <span className="text-[10px] font-medium drop-shadow-md text-white">Remix</span>
              </div>
            </div>

            {/* Bottom Overlay */}
            <div className="absolute bottom-20 left-4 right-16 z-20 text-left pointer-events-none">
              <div className="flex items-center gap-2 mb-2 pointer-events-auto">
                <span className="font-bold text-white text-lg shadow-black drop-shadow-md flex items-center gap-1">
                  @{item.username}
                  {item.verified && <Verified size={14} className="text-blue-400" />}
                </span>
                <button className="text-xs bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded-full text-white backdrop-blur-sm transition-colors">
                  Follow
                </button>
              </div>
              <p className="text-white/90 text-sm leading-relaxed line-clamp-2 mb-3 drop-shadow-md max-w-[90%] pointer-events-auto">
                {item.description}
              </p>
              
              <div className="flex items-center gap-2 text-white/80 text-xs font-medium mb-4 animate-pulse">
                 <Music2 size={12} />
                 <div className="overflow-hidden w-32">
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
