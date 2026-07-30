import React, { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Star, 
  Download, 
  Coins, 
  Sparkles, 
  Zap, 
  TrendingUp,
  Plus,
  ShoppingBag
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MARKETPLACE_ITEMS } from "@/lib/mockData";

// Extended mock data for better grid visualization
const EXTENDED_ITEMS = [
  ...MARKETPLACE_ITEMS,
  { 
    id: 5, 
    title: "Abstract Motion Backgrounds", 
    creator: "VisualLoop", 
    type: "Video Asset", 
    price: 15, 
    rating: 4.6, 
    downloads: 420,
    image: "https://picsum.photos/seed/motion/300/200",
    tags: ["Loop", "Abstract", "Background"] 
  },
  { 
    id: 6, 
    title: "Podcast Intro Music", 
    creator: "AudioLab", 
    type: "Audio", 
    price: 10, 
    rating: 4.9, 
    downloads: 2100,
    image: "https://picsum.photos/seed/audio/300/200",
    tags: ["Music", "Intro", "Podcast"] 
  },
  ...MARKETPLACE_ITEMS.map(item => ({ ...item, id: item.id + 10 })), // Duplicate for grid fullness
];

const CATEGORIES = ["All", "Prompts", "Scripts", "Filters", "Templates", "Avatars", "Audio"];

export default function AssetMarketplace() {
  const [, setLocation] = useLocation();
  const [userCredits, setUserCredits] = useState(320);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handlePurchase = (price: number) => {
    if (userCredits >= price) {
      setUserCredits(prev => prev - price);
    }
  };

  const filteredItems = EXTENDED_ITEMS.filter(item => {
    const matchesCategory = activeCategory === "All" || item.type.includes(activeCategory.slice(0, -1)); // Simple matching
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout hideTabs>
      <div className="min-h-screen bg-background flex flex-col">
        {/* Standard Sticky Header */}
        <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-white/5 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button aria-label="Go back" 
              onClick={() => setLocation("/")}
              className="p-2 -ml-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
              Marketplace
              <ShoppingBag size={16} className="text-accent" />
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-card border border-white/10 px-3 py-1.5 rounded-full">
              <Coins size={14} className="text-yellow-400" fill="currentColor" />
              <span className="text-xs font-bold text-white">{userCredits}</span>
            </div>
            <button aria-label="Add" className="p-2 rounded-full bg-accent text-black hover:bg-accent/90 transition-colors">
              <Plus size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full space-y-8">
          
          {/* Hero / Featured Section */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-900/40 via-black to-black border border-white/10 aspect-[2/1] md:aspect-[3/1]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-6 md:p-10 max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 rounded bg-accent text-black text-[10px] font-bold uppercase tracking-wider">Featured</span>
                <span className="text-xs font-bold text-yellow-400 flex items-center gap-1"><Star size={12} fill="currentColor" /> 5.0</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-2">The Ultimate Creator Bundle</h2>
              <p className="text-sm md:text-base text-gray-300 mb-6 line-clamp-2">
                Everything you need to launch your channel: 50+ prompts, 10 cinematic LUTS, and a complete brand kit template.
              </p>
              <button className="px-6 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors flex items-center gap-2">
                <Zap size={16} fill="currentColor" /> Get it for 250 Credits
              </button>
            </div>
          </div>

          {/* Search & Categories */}
          <div className="space-y-4 sticky top-20 z-20 bg-background/95 backdrop-blur p-2 -mx-2 rounded-xl">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search assets, prompts, creators..." 
                  className="w-full bg-card border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-gray-600"
                />
              </div>
              <button aria-label="Filter" className="px-4 rounded-xl bg-card border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-colors">
                <Filter size={18} />
              </button>
            </div>

            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-bold border transition-all whitespace-nowrap flex items-center gap-2",
                    activeCategory === cat 
                      ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]" 
                      : "bg-card text-gray-400 border-white/5 hover:border-white/20 hover:text-white"
                  )}
                >
                  {cat === "All" && <TrendingUp size={12} />}
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white">Popular Assets</h3>
              <button className="text-xs text-accent hover:underline inline-flex items-center min-h-6">View Leaderboard</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredItems.map((item, idx) => (
                <div 
                  key={`${item.id}-${idx}`} 
                  className="group relative bg-card rounded-2xl border border-white/5 overflow-hidden hover:border-accent/50 hover:shadow-[0_0_20px_-5px_rgba(34,211,238,0.15)] transition-all duration-300 flex flex-col"
                >
                  {/* Thumbnail */}
                  <div className="aspect-[4/3] relative overflow-hidden bg-black">
                    <img loading="lazy" decoding="async" 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 rounded-lg bg-black/60 backdrop-blur text-[10px] font-bold text-white border border-white/10">
                        {item.type}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="mb-3">
                      <h3 className="text-sm font-bold text-white mb-1 line-clamp-1 group-hover:text-accent transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        by <span className="text-gray-300 hover:text-white cursor-pointer">{item.creator}</span>
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/5">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1 text-yellow-400 text-[10px] font-bold">
                          <Star size={10} fill="currentColor" /> {item.rating}
                        </div>
                        <span className="text-[9px] text-gray-600">{item.downloads} downloads</span>
                      </div>

                      <button 
                        onClick={() => handlePurchase(item.price)}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all",
                          item.price === 0 
                            ? "bg-white/10 text-white hover:bg-white/20" 
                            : "bg-white text-black hover:bg-gray-200 shadow-lg shadow-white/5"
                        )}
                      >
                        {item.price === 0 ? (
                          <>
                            <Download size={12} /> Free
                          </>
                        ) : (
                          <>
                            <Coins size={12} className="text-yellow-600" fill="currentColor" /> {item.price}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}