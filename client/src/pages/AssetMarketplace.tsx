import React, { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { GradientButton } from "@/components/GradientButton";
import { ArrowLeft, Search, Filter, Star, Download, Coins, Lock, Unlock } from "lucide-react";
import { cn } from "@/lib/utils";
import { MARKETPLACE_ITEMS } from "@/lib/mockData";

export default function AssetMarketplace() {
  const [, setLocation] = useLocation();
  const [userCredits, setUserCredits] = useState(320);

  const handlePurchase = (price: number) => {
    if (userCredits >= price) {
      setUserCredits(prev => prev - price);
      // Show success animation
    }
  };

  return (
    <Layout hideTabs>
      <div className="min-h-screen bg-background pb-8">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pt-8 bg-background/80 backdrop-blur-md sticky top-0 z-20 border-b border-white/5">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setLocation("/create")}
              className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-display font-bold text-white">Marketplace</h1>
          </div>
          
          <div className="flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
            <Coins size={14} className="text-yellow-400" />
            <span className="text-xs font-bold text-white">{userCredits}</span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Search & Filter */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search prompts, presets..." 
                className="w-full bg-[#1E1E1E] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-white/30"
              />
            </div>
            <button className="p-3 rounded-xl bg-[#1E1E1E] border border-white/10 text-gray-400 hover:text-white transition-colors">
              <Filter size={18} />
            </button>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {["All", "Prompts", "Scripts", "Filters", "Templates", "Avatars"].map(cat => (
              <button 
                key={cat}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-bold border transition-all whitespace-nowrap",
                  cat === "All" 
                    ? "bg-white text-black border-white" 
                    : "bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 gap-4">
            {MARKETPLACE_ITEMS.map(item => (
              <div key={item.id} className="bg-[#1E1E1E] border border-white/5 rounded-xl overflow-hidden group hover:border-white/10 transition-all">
                <div className="flex gap-4 p-3">
                  <div className="w-24 h-24 rounded-lg bg-black shrink-0 overflow-hidden relative">
                    <img src={item.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-1 left-1 bg-black/60 backdrop-blur px-1.5 py-0.5 rounded text-[10px] text-white font-bold">
                      {item.type}
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white line-clamp-1">{item.title}</h3>
                      <p className="text-xs text-gray-500 mb-1">by {item.creator}</p>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-0.5 text-[10px] text-yellow-400">
                          <Star size={10} fill="currentColor" /> {item.rating}
                        </span>
                        <span className="flex items-center gap-0.5 text-[10px] text-gray-500">
                          <Download size={10} /> {item.downloads}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-end mt-2">
                      <div className="flex gap-1">
                        {item.tags.map(tag => (
                          <span key={tag} className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-gray-400">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button 
                        onClick={() => handlePurchase(item.price)}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all",
                          item.price === 0 
                            ? "bg-white/10 text-white hover:bg-white/20" 
                            : "bg-gradient-accent text-black hover:opacity-90"
                        )}
                      >
                        {item.price === 0 ? (
                          "Get Free"
                        ) : (
                          <>
                            {item.price} Credits
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sell CTA */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-white/10 text-center">
            <h3 className="text-lg font-bold text-white mb-2">Earn from your creativity</h3>
            <p className="text-sm text-gray-400 mb-4">Sell your prompts, presets, and templates to thousands of creators.</p>
            <button className="px-6 py-2 bg-white text-black rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors">
              Start Selling
            </button>
          </div>

        </div>
      </div>
    </Layout>
  );
}
