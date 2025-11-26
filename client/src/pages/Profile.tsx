import React from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { GradientButton } from "@/components/GradientButton";
import { Settings, Grid, Bookmark, Zap, Wallet, Edit2, Share2, Briefcase, Crown, ChevronRight, Target, Instagram, Youtube, Twitter, Globe, Music, Podcast } from "lucide-react";
import { cn } from "@/lib/utils";
import profileBg from "@assets/generated_images/abstract_3d_glass_shapes_for_profile_background.png";
import gridImage from "@assets/generated_images/abstract_digital_art_square.png";

export default function Profile() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = React.useState<"creations" | "saved">("creations");

  // Mock Connected Accounts
  const CONNECTED_ACCOUNTS = [
    { id: "instagram", name: "Instagram", icon: Instagram, color: "#E1306C", handle: "@felix.art", connected: true },
    { id: "tiktok", name: "TikTok", icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    ), color: "#FFFFFF", handle: "@felix_k", connected: true },
    { id: "youtube", name: "YouTube", icon: Youtube, color: "#FF0000", handle: "Felix Kjellberg", connected: false },
    { id: "twitter", name: "X", icon: Twitter, color: "#1DA1F2", handle: "@felix", connected: true },
    { id: "spotify", name: "Spotify", icon: Music, color: "#1DB954", handle: "Future Tech", connected: true },
    { id: "apple", name: "Apple Podcasts", icon: Podcast, color: "#A64AC9", handle: "Future Tech", connected: true },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background pb-20">
        {/* Hero / Header */}
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={profileBg} 
            alt="Cover" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#121212]" />
          
          <button className="absolute top-4 right-4 p-2 rounded-full bg-black/20 backdrop-blur-md text-white border border-white/10 hover:bg-white/10 transition-colors">
            <Settings size={20} />
          </button>
        </div>

        {/* Profile Info */}
        <div className="px-6 -mt-12 relative z-10 mb-6">
          <div className="flex justify-between items-end mb-4">
            <div className="w-24 h-24 rounded-2xl border-4 border-[#121212] overflow-hidden bg-black shadow-xl relative group">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                alt="Avatar" 
                className="w-full h-full bg-[#1E1E1E]"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <Edit2 size={16} className="text-white" />
              </div>
            </div>
            
            <div className="flex gap-2 mb-2">
              <button className="px-4 py-2 rounded-xl bg-[#1E1E1E] border border-white/10 text-xs font-bold text-white hover:bg-[#252525] transition-colors">
                Edit Profile
              </button>
              <button className="p-2 rounded-xl bg-[#1E1E1E] border border-white/10 text-white hover:bg-[#252525] transition-colors">
                <Share2 size={16} />
              </button>
            </div>
          </div>

          <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            Felix Kjellberg
            <span className="px-1.5 py-0.5 rounded-md bg-primary/20 text-primary text-[10px] font-bold tracking-wider border border-primary/20">
              PRO
            </span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Digital artist exploring the latent space. 🌌</p>
          
          {/* Stats Row */}
          <div className="flex gap-6 mt-6">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white">1.2k</span>
              <span className="text-xs text-gray-500 uppercase tracking-wide">Followers</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white">842</span>
              <span className="text-xs text-gray-500 uppercase tracking-wide">Following</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white">14.5k</span>
              <span className="text-xs text-gray-500 uppercase tracking-wide">Likes</span>
            </div>
          </div>
        </div>

        {/* Connected Accounts (Super App Feature) */}
        <div className="px-6 mb-8">
          <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
            <Globe size={12} /> Connected Socials
          </h3>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {CONNECTED_ACCOUNTS.map((account) => (
              <div 
                key={account.id} 
                className={cn(
                  "min-w-[100px] p-3 rounded-xl border flex flex-col items-center gap-2 transition-all cursor-pointer",
                  account.connected 
                    ? "bg-[#1E1E1E] border-white/10 hover:border-white/30" 
                    : "bg-transparent border-dashed border-white/10 opacity-60 hover:opacity-100 hover:bg-white/5"
                )}
              >
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: account.connected ? account.color : '#333', color: account.id === 'tiktok' || account.id === 'x' ? 'black' : 'white' }}
                >
                  <account.icon className="w-4 h-4 text-white" />
                </div>
                <div className="text-center">
                  <span className="text-[10px] font-bold text-white block truncate max-w-[80px]">
                    {account.connected ? account.handle : "Connect"}
                  </span>
                  <span className="text-[8px] text-gray-500 uppercase">
                    {account.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Grid (Responsive) */}
        <div className="px-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Credits Wallet Card */}
          <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-[#1E1E1E] to-[#252525] border border-white/10 flex flex-col justify-between relative overflow-hidden group min-h-[120px]">
            <div className="absolute inset-0 bg-gradient-accent opacity-5 group-hover:opacity-10 transition-opacity" />
            
            <div className="relative z-10">
              <p className="text-xs font-medium text-gray-400 uppercase mb-1 flex items-center gap-1">
                <Wallet size={12} />
                Credit Balance
              </p>
              <p className="text-2xl font-display font-bold text-white flex items-center gap-1">
                320 <span className="text-sm font-normal text-gray-500">/ 500</span>
              </p>
            </div>

            <button 
              onClick={() => setLocation("/wallet")}
              className="relative z-10 mt-2 w-full py-2 rounded-xl bg-white text-black text-xs font-bold flex items-center justify-center gap-1 hover:bg-gray-200 transition-colors shadow-lg"
            >
              <Zap size={14} className="fill-black" />
              Top Up
            </button>
          </div>

          {/* Upgrade Banner */}
          <button 
            onClick={() => setLocation("/pricing")}
            className="w-full h-full min-h-[120px] rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 p-4 flex flex-col justify-between group hover:border-purple-500/50 transition-all"
          >
            <div className="flex items-start justify-between w-full">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:text-white group-hover:bg-purple-500 transition-colors">
                <Crown size={16} />
              </div>
              <span className="px-2 py-1 rounded-md bg-purple-500/20 text-purple-300 text-[10px] font-bold">PRO</span>
            </div>
            <div className="text-left">
              <h3 className="text-sm font-bold text-white group-hover:text-purple-200 transition-colors">Syndicate Plan</h3>
              <p className="text-[10px] text-gray-400">Unlock Analytics & 0% Fees</p>
            </div>
          </button>

          {/* Creator Program Button */}
          <button 
            onClick={() => setLocation("/affiliate")}
            className="w-full h-full min-h-[120px] rounded-2xl bg-[#1E1E1E] border border-white/5 p-4 flex flex-col justify-between hover:bg-white/5 transition-colors group"
          >
            <div className="flex items-start justify-between w-full">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                <Briefcase size={20} />
              </div>
              <ChevronRight size={16} className="text-gray-600 group-hover:text-white transition-colors" />
            </div>
            <div className="text-left">
              <div className="flex justify-between items-end">
                <div>
                   <h3 className="text-sm font-bold text-white">Creator Hub</h3>
                   <p className="text-[10px] text-gray-400">Brand deals & Earnings</p>
                </div>
                <span className="text-xs font-bold text-white bg-white/10 px-2 py-1 rounded">$1,240.50</span>
              </div>
            </div>
          </button>
        </div>

        {/* Content Tabs */}
        <div className="px-2 mb-4 border-b border-white/5 flex">
          <button 
            onClick={() => setActiveTab("creations")}
            className={cn(
              "flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-all border-b-2",
              activeTab === "creations" ? "text-white border-primary" : "text-gray-500 border-transparent hover:text-gray-300"
            )}
          >
            <Grid size={16} />
            Creations
          </button>
          <button 
            onClick={() => setActiveTab("saved")}
            className={cn(
              "flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-all border-b-2",
              activeTab === "saved" ? "text-white border-primary" : "text-gray-500 border-transparent hover:text-gray-300"
            )}
          >
            <Bookmark size={16} />
            Saved
          </button>
        </div>

        {/* Masonry Grid (Simulated) */}
        <div className="px-2 grid grid-cols-2 gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-square rounded-xl bg-[#1E1E1E] overflow-hidden relative group cursor-pointer">
              <img 
                src={gridImage} 
                alt="Creation" 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                <span className="text-xs font-medium text-white">Cyber Dream #{i + 1}</span>
                <span className="text-[10px] text-gray-400">2.4k likes</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
