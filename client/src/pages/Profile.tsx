import React from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { GradientButton } from "@/components/GradientButton";
import { Settings, Grid, Bookmark, Zap, Wallet, Edit2, Share2, Briefcase, Crown, ChevronRight, Target, Instagram, Youtube, Twitter, Globe, Music, Podcast, Linkedin } from "lucide-react";
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
    { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "#0077B5", handle: "Felix Kjellberg", connected: true },
    { id: "pinterest", name: "Pinterest", icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.399.165-1.497-.698-2.433-2.889-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.173 0 7.41 2.967 7.41 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.62 0 12.017 0z"/>
      </svg>
    ), color: "#BD081C", handle: "@felix_pins", connected: false },
    { id: "threads", name: "Threads", icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
        <path d="M17.75 12.04c0-3.15-2.6-5.72-5.75-5.72-3.15 0-5.72 2.57-5.72 5.72 0 3.15 2.57 5.72 5.72 5.72 1.24 0 2.4-.4 3.35-1.08v1.5c-.98.66-2.18 1.08-3.35 1.08-4.25 0-7.72-3.47-7.72-7.72S7.75 4.32 12 4.32c3.86 0 7.08 2.85 7.63 6.56.1.63.12 1.24.05 1.84-.18 1.66-1.64 2.78-3.27 2.78-1.38 0-2.54-.88-2.87-2.17h-.05c-.57 1.28-1.78 2.17-3.23 2.17-2.04 0-3.72-1.68-3.72-3.72 0-2.04 1.68-3.72 3.72-3.72 1.44 0 2.66.89 3.23 2.16h.05V9.22h1.95v4.64c0 .33.03.66.1.97.2.93 1.06 1.51 1.96 1.51.98 0 1.82-.66 1.94-1.63.06-.48.05-.97-.04-1.45-.45-3.08-3.09-5.46-6.24-5.46-3.42 0-6.22 2.8-6.22 6.22 0 3.42 2.8 6.22 6.22 6.22 1.71 0 3.26-.7 4.38-1.82l1.42 1.42c-1.48 1.48-3.53 2.4-5.8 2.4-4.53 0-8.22-3.69-8.22-8.22S7.47 2.32 12 2.32c4.53 0 8.22 3.69 8.22 8.22 0 .67-.07 1.32-.19 1.96-.2.98-.64 1.87-1.26 2.61-.62.74-1.38 1.31-2.24 1.66-.86.35-1.79.53-2.78.53-2.04 0-3.88-.78-5.25-2.04l1.35-1.48c1.03.95 2.41 1.52 3.9 1.52 1.1 0 2.11-.33 2.94-.89.83-.56 1.45-1.36 1.75-2.31.14-.42.23-.87.23-1.33V12.04zm-5.75-3.72c-1.1 0-2 1-2 2 0 1.1.9 2 2 2 1.1 0 2-.9 2-2 0-1.1-.9-2-2-2z" fillRule="evenodd"/>
      </svg>
    ), color: "#FFFFFF", handle: "@felix", connected: true },
    { id: "spotify", name: "Spotify", icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.72.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ), color: "#1DB954", handle: "Future Tech", connected: true },
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
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                  style={{ 
                    backgroundColor: account.connected ? account.color : '#333',
                    color: ['tiktok', 'threads', 'x'].includes(account.id) && account.connected ? 'black' : 'white'
                  }}
                >
                  <account.icon className="w-4 h-4 fill-current" />
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
