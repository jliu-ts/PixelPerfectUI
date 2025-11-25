import React from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { GradientButton } from "@/components/GradientButton";
import { Settings, Grid, Bookmark, Zap, Wallet, Edit2, Share2, Briefcase, Crown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import profileBg from "@assets/generated_images/abstract_3d_glass_shapes_for_profile_background.png";

export default function Profile() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = React.useState<"creations" | "saved">("creations");

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

        {/* Credits Wallet Card */}
        <div className="px-6 mb-8 space-y-3">
          <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-[#1E1E1E] to-[#252525] border border-white/10 flex items-center justify-between relative overflow-hidden group">
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

            <button className="relative z-10 px-4 py-2 rounded-xl bg-white text-black text-xs font-bold flex items-center gap-1 hover:bg-gray-200 transition-colors shadow-lg">
              <Zap size={14} className="fill-black" />
              Top Up
            </button>
          </div>

          {/* Upgrade Banner */}
          <button 
            onClick={() => setLocation("/pricing")}
            className="w-full p-1 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 mb-3 group"
          >
            <div className="bg-[#1E1E1E] rounded-xl p-3 flex items-center justify-between group-hover:bg-transparent transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:text-white">
                  <Crown size={16} />
                </div>
                <div className="text-left">
                  <h3 className="text-xs font-bold text-white">Upgrade to Syndicate</h3>
                  <p className="text-[10px] text-gray-400 group-hover:text-white/80">Unlock Analytics & 0% Fees</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-500 group-hover:text-white" />
            </div>
          </button>

          {/* Creator Program Button */}
          <button 
            onClick={() => setLocation("/affiliate")}
            className="w-full p-4 rounded-2xl bg-[#1E1E1E] border border-white/5 flex items-center justify-between hover:bg-white/5 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                <Briefcase size={20} />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-bold text-white">Creator Hub</h3>
                <p className="text-xs text-gray-400 group-hover:text-gray-300">Brand deals & Earnings</p>
              </div>
            </div>
            <span className="text-xs font-bold text-white bg-white/10 px-2 py-1 rounded">$1,240.50</span>
          </button>
          
          {/* Pitch Deck Link (Hidden/Investor) */}
          <button 
            onClick={() => setLocation("/pitch")}
            className="w-full mt-3 py-2 text-[10px] text-gray-600 hover:text-gray-400 flex items-center justify-center gap-1 uppercase tracking-widest"
          >
            <Target size={10} /> Investor Deck
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
                src={`https://picsum.photos/seed/${i + 40}/400/400`} 
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
